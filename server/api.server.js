/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const register = require('react-server-dom-webpack/node-register');
register();
const babelRegister = require('@babel/register');

babelRegister({
  ignore: [/[\\\/](build|server|node_modules)[\\\/]/],
  presets: [['react-app', {runtime: 'automatic'}]],
  plugins: ['@babel/transform-modules-commonjs'],
});

const express = require('express');
const compress = require('compression');
const {readFileSync} = require('fs');
const {unlink, writeFile} = require('fs/promises');
const {pipeToNodeWritable} = require('react-server-dom-webpack/writer');
const path = require('path');
const {Pool} = require('pg');
const React = require('react');
const stream = require('stream');
const ReactDOMServer = require('react-dom/server');
const ReactApp = require('../src/App.server').default;

// Don't keep credentials in the source tree in a real app!
const pool = new Pool(require('../credentials'));

const PORT = 4000;
const app = express();

app.use(compress());
app.use(express.json());
app.use(ssrMiddleware);

app.listen(PORT, () => {
  console.log('React Notes listening at 4000...');
});

function handleErrors(fn) {
  return async function(req, res, next) {
    try {
      return await fn(req, res);
    } catch (x) {
      next(x);
    }
  };
}

app.get(
  '/',
  handleErrors(async function(_req, res) {
    await waitForWebpack();
    const html = readFileSync(
      path.resolve(__dirname, '../build/index.html'),
      'utf8'
    );
    // Note: this is sending an empty HTML shell, like a client-side-only app.
    // However, the intended solution (which isn't built out yet) is to read
    // from the Server endpoint and turn its response into an HTML stream.
    res.send(html);
  })
);

async function renderReactTree(res, props) {
  await waitForWebpack();
  const manifest = readFileSync(
    path.resolve(__dirname, '../build/react-client-manifest.json'),
    'utf8'
  );
  const moduleMap = JSON.parse(manifest);
  pipeToNodeWritable(React.createElement(ReactApp, props), res, moduleMap);
}

function sendResponse(req, res, redirectToId) {
  const location = JSON.parse(req.query.location || null) || {};
  if (redirectToId) {
    location.selectedId = redirectToId;
  }
  if (req.query.ssr !== '') {
    res.set('X-Location', JSON.stringify(location));
  }

  renderReactTree(res, {
    selectedId: location.selectedId,
    isEditing: location.isEditing,
    searchText: location.searchText,
  });
}

app.get('/react', function(req, res) {
  sendResponse(req, res, null);
});

const NOTES_PATH = path.resolve(__dirname, '../notes');

app.post(
  '/notes',
  handleErrors(async function(req, res) {
    const now = new Date();
    const result = await pool.query(
      'insert into notes (title, body, created_at, updated_at) values ($1, $2, $3, $3) returning id',
      [req.body.title, req.body.body, now]
    );
    const insertedId = result.rows[0].id;
    await writeFile(
      path.resolve(NOTES_PATH, `${insertedId}.md`),
      req.body.body,
      'utf8'
    );
    sendResponse(req, res, insertedId);
  })
);

app.put(
  '/notes/:id',
  handleErrors(async function(req, res) {
    const now = new Date();
    const updatedId = Number(req.params.id);
    await pool.query(
      'update notes set title = $1, body = $2, updated_at = $3 where id = $4',
      [req.body.title, req.body.body, now, updatedId]
    );
    await writeFile(
      path.resolve(NOTES_PATH, `${updatedId}.md`),
      req.body.body,
      'utf8'
    );
    sendResponse(req, res, null);
  })
);

app.delete(
  '/notes/:id',
  handleErrors(async function(req, res) {
    await pool.query('delete from notes where id = $1', [req.params.id]);
    await unlink(path.resolve(NOTES_PATH, `${req.params.id}.md`));
    sendResponse(req, res, null);
  })
);

app.get(
  '/notes',
  handleErrors(async function(_req, res) {
    const {rows} = await pool.query('select * from notes order by id desc');
    res.json(rows);
  })
);

app.get(
  '/notes/:id',
  handleErrors(async function(req, res) {
    const {rows} = await pool.query('select * from notes where id = $1', [
      req.params.id,
    ]);
    res.json(rows[0]);
  })
);

app.get('/sleep/:ms', function(req, res) {
  setTimeout(() => {
    res.json({ok: true});
  }, req.params.ms);
});

app.use(express.static('build'));
app.use(express.static('public'));

app.on('error', function(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

async function waitForWebpack() {
  while (true) {
    try {
      readFileSync(path.resolve(__dirname, '../build/index.html'));
      return;
    } catch (err) {
      console.log(
        'Could not find webpack build output. Will retry in a second...'
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

const ignoreTypes = new Set();
async function ssrMiddleware(req, res, next) {
  // SSR only GET requests that define a ssr query param
  if (req.method !== 'GET' || req.query.ssr !== '') {
    return next();
  }

  await waitForWebpack();
  const manifest = readFileSync(
    path.resolve(__dirname, '../build/react-client-manifest.json'),
    'utf8'
  );
  const moduleMap = JSON.parse(manifest);

  const html = readFileSync(
    path.resolve(__dirname, '../build/index.html'),
    'utf8'
  );
  const [head, tail] = html.split('<div id="root">');
  res.write(head + '<div id="root">');

  // Instead of passing `res` (the response stream) to
  // React's pipeToNodeWritable we pass a tranform `renderTransform` which is where we
  // turn chunks into HTML.
  // `renderTransform` is piped to `res`
  //
  // reactStream.pipe(renderTransform).pipe(res)
  const renderTransform = new stream.Transform({
    transform: (buf, enc, next) => {
      const chunk = buf.toString();
      const i = chunk.indexOf(':');
      // Get type of message and id eg.
      // J1 - where J stands for JSX
      const [_, type, id] = chunk.slice(0, i).match(/(\w+)(\d+)/);

      // This is a client module reference
      if (type === 'M') {
        // TODO: generate <link rel="preload" href="..." /> tag
        return next(null, '');
      }

      // Other types include S (suspense) which we can ignore I think.
      // ignoreTypes tracks references to other JSX elements that are in other chunks
      // i.e. React suspended and later sent the resolved subtree in another chunk
      // In SSR we will render a placeholder.
      if (type !== 'J' || ignoreTypes.has(id)) {
        return next(null, '');
      }

      // Render to string (HTML)
      const json = JSON.parse(chunk.slice(i + 1));
      const app = toReactTree(json);
      next(null, ReactDOMServer.renderToStaticMarkup(app));
    },
    flush: () => {
      res.write(tail);
      res.end();
    },
  });

  renderTransform.pipe(res);

  sendResponse(req, renderTransform, null);
}

// Renders Server Components JSON to React Elements.
function toReactTree([symb, type, _key, props = {}]) {
  if (!type) {
    return null;
  }

  const isSuspense = type.startsWith('$') || props.fallback;
  if (isSuspense) {
    if (typeof props.children === 'string' && props.children.startsWith('@')) {
      ignoreTypes.add(props.children.slice(1));
    }
    const elementMeta =
      typeof props.children === 'object' ? props.children : props.fallback;
    return toReactTree(elementMeta);
  }

  const isClientRef = type.startsWith('@');
  if (isClientRef) {
    return null;
  }

  const {children, ...otherProps} = props;

  let renderedChildren = null;

  if (Array.isArray(children)) {
    if (Array.isArray(children[0])) {
      // [[element], [element], [element]]
      renderedChildren = children.map((child) => {
        if (Array.isArray(child)) {
          return toReactTree(child);
        }
        if (typeof child === 'string') {
          return child;
        }
        return null;
      });
    } else if (children[0] === '$') {
      // [element]
      renderedChildren = toReactTree(children);
    } else {
      // other
      renderedChildren = children;
    }
  } else {
    renderedChildren = children;
  }
  return React.createElement(type, {
    ...otherProps,
    children: renderedChildren,
  });
}
