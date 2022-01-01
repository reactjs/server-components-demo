/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {ILocation} from '../src/types';

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
const {unlink, writeFile} = require('fs').promises;
const {renderToPipeableStream} = require('react-server-dom-webpack/writer');
const path = require('path');
const {Pool} = require('pg');
const React = require('react');
import App from '../src/App.server';

// Don't keep credentials in the source tree in a real app!
const pool = new Pool(require('../credentials').default);

const PORT = process.env.PORT || 4000;
const app = express();

app.use(compress());
app.use(express.json());

app
  .listen(PORT, () => {
    console.log(`React Notes listening at ${PORT}...`);
  })
  .on('error', function(error: any) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const isPipe = (portOrPipe: any) => Number.isNaN(portOrPipe);
    const bind = isPipe(PORT) ? 'Pipe ' + PORT : 'Port ' + PORT;
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

function handleErrors(fn: any) {
  return async function(req: any, res: any, next: any) {
    try {
      return await fn(req, res);
    } catch (x) {
      next(x);
    }
  };
}

app.get(
  '/',
  handleErrors(async function(_req: any, res: any) {
    await waitForWebpack();
    const html = readFileSync(
      path.resolve(__dirname, '../../build/index.html'),
      'utf8'
    );
    // Note: this is sending an empty HTML shell, like a client-side-only app.
    // However, the intended solution (which isn't built out yet) is to read
    // from the Server endpoint and turn its response into an HTML stream.
    res.send(html);
  })
);

async function renderReactTree(res: any, props: {location: ILocation}) {
  await waitForWebpack();
  const manifest = readFileSync(
    path.resolve(__dirname, '../../build/react-client-manifest.json'),
    'utf8'
  );
  const moduleMap = JSON.parse(manifest);
  const {pipe} = renderToPipeableStream(
    React.createElement(App, props),
    moduleMap
  );
  pipe(res);
}

function sendResponse(req: any, res: any, redirectToId: any) {
  const location = JSON.parse(req.query.location);
  if (redirectToId) {
    location.selectedId = redirectToId;
  }
  res.set('X-Location', JSON.stringify(location));
  renderReactTree(res, {
    location: {
      selectedId: location.selectedId,
      isEditing: location.isEditing,
      searchText: location.searchText,
      filterFavorites: location.filterFavorites,
    },
  });
}

app.get('/react', function(req: any, res: any) {
  sendResponse(req, res, null);
});

const NOTES_PATH = path.resolve(__dirname, '../../notes');

app.post(
  '/notes',
  handleErrors(async function(req: any, res: any) {
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
  handleErrors(async function(req: any, res: any) {
    const now = new Date();
    const updatedId = Number(req.params.id);

    let query = 'update notes set ';
    const params = [];
    let index = 1;

    Object.keys(req.body).forEach((key) => {
      query += `${key} = $${index},`;
      index++;

      params.push(req.body[key]);
    });
    query = query.slice(0, -1);

    query += ` where id = $${index}`;
    params.push(updatedId);

    await pool.query(query, params);

    if (req.body.body) {
      await writeFile(
        path.resolve(NOTES_PATH, `${updatedId}.md`),
        req.body.body,
        'utf8'
      );
    }
    sendResponse(req, res, null);
  })
);

app.delete(
  '/notes/:id',
  handleErrors(async function(req: any, res: any) {
    await pool.query('delete from notes where id = $1', [req.params.id]);
    await unlink(path.resolve(NOTES_PATH, `${req.params.id}.md`));
    sendResponse(req, res, null);
  })
);

app.get(
  '/notes',
  handleErrors(async function(_req: any, res: any) {
    const {rows} = await pool.query('select * from notes order by id desc');
    res.json(rows);
  })
);

app.get(
  '/notes/:id',
  handleErrors(async function(req: any, res: any) {
    const {rows} = await pool.query('select * from notes where id = $1', [
      req.params.id,
    ]);
    res.json(rows[0]);
  })
);

app.get('/sleep/:ms', function(req: any, res: any) {
  setTimeout(() => {
    res.json({ok: true});
  }, req.params.ms);
});

app.use(express.static('build'));
app.use(express.static('public'));

async function waitForWebpack() {
  while (true) {
    try {
      readFileSync(path.resolve(__dirname, '../../build/index.html'));
      return;
    } catch (err) {
      console.log(
        'Could not find webpack build output. Will retry in a second...'
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
