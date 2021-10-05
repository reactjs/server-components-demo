/** @license React vundefined
 * react-server-dom-webpack-plugin.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

'use strict';

import path from 'path';
import url from 'url';
import asyncLib from 'neo-async';
import ModuleDependency from 'webpack/lib/dependencies/ModuleDependency';
import NullDependency from 'webpack/lib/dependencies/NullDependency';
import AsyncDependenciesBlock from 'webpack/lib/AsyncDependenciesBlock';
import Template from 'webpack/lib/Template';

const isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

class ClientReferenceDependency extends ModuleDependency {
  public userRequest: any;

  constructor(request) {
    super(request);
  }

  get type() {
    return 'client-reference';
  }
} // This is the module that will be used to anchor all client references to.
// I.e. it will have all the client files as async deps from this point on.
// We use the Flight client implementation because you can't get to these
// without the client runtime so it's the first time in the loading sequence
// you might want them.

const clientFileName =
  process.env.NODE_ENV === 'production'
    ? require('./cjs/react-server-dom-webpack.production.min.js')
    : require('./cjs/react-server-dom-webpack.development.js');

const PLUGIN_NAME = 'React Server Plugin';

export default class ReactFlightWebpackPlugin {
  clientReferences: any;
  chunkName: any;
  manifestFilename: string;

  constructor(options) {
    if (!options || typeof options.isServer !== 'boolean') {
      throw new Error(
        PLUGIN_NAME + ': You must specify the isServer option as a boolean.'
      );
    }

    if (options.isServer) {
      throw new Error('TODO: Implement the server compiler.');
    }

    if (!options.clientReferences) {
      this.clientReferences = [
        {
          directory: '.',
          recursive: true,
          include: /\.client\.(js|ts|jsx|tsx)$/,
        },
      ];
    } else if (
      typeof options.clientReferences === 'string' ||
      !isArray(options.clientReferences)
    ) {
      this.clientReferences = [options.clientReferences];
    } else {
      this.clientReferences = options.clientReferences;
    }

    if (typeof options.chunkName === 'string') {
      this.chunkName = options.chunkName;

      if (!/\[(index|request)\]/.test(this.chunkName)) {
        this.chunkName += '[index]';
      }
    } else {
      this.chunkName = 'client[index]';
    }

    this.manifestFilename =
      options.manifestFilename || 'react-client-manifest.json';
  }

  apply(compiler) {
    const _this = this;

    var resolvedClientReferences;

    var run = function(params, callback) {
      // First we need to find all client files on the file system. We do this early so
      // that we have them synchronously available later when we need them. This might
      // not be needed anymore since we no longer need to compile the module itself in
      // a special way. So it's probably better to do this lazily and in parallel with
      // other compilation.
      var contextResolver = compiler.resolverFactory.get('context', {});

      _this.resolveAllClientFiles(
        compiler.context,
        contextResolver,
        compiler.inputFileSystem,
        compiler.createContextModuleFactory(),
        function(err, resolvedClientRefs) {
          if (err) {
            callback(err);
            return;
          }

          resolvedClientReferences = resolvedClientRefs;
          callback();
        }
      );
    };

    compiler.hooks.run.tapAsync(PLUGIN_NAME, run);
    compiler.hooks.watchRun.tapAsync(PLUGIN_NAME, run);
    compiler.hooks.compilation.tap(PLUGIN_NAME, function(compilation, _ref) {
      var normalModuleFactory = _ref.normalModuleFactory;
      compilation.dependencyFactories.set(
        ClientReferenceDependency,
        normalModuleFactory
      );
      compilation.dependencyTemplates.set(
        ClientReferenceDependency,
        new NullDependency.Template()
      );
      compilation.hooks.buildModule.tap(PLUGIN_NAME, function(module) {
        // We need to add all client references as dependency of something in the graph so
        // Webpack knows which entries need to know about the relevant chunks and include the
        // map in their runtime. The things that actually resolves the dependency is the Flight
        // client runtime. So we add them as a dependency of the Flight client runtime.
        // Anything that imports the runtime will be made aware of these chunks.
        // TODO: Warn if we don't find this file anywhere in the compilation.
        if (module.resource !== clientFileName) {
          return;
        }

        if (resolvedClientReferences) {
          for (var i = 0; i < resolvedClientReferences.length; i++) {
            var dep = resolvedClientReferences[i];

            var chunkName = _this.chunkName
              .replace(/\[index\]/g, '' + i)
              .replace(/\[request\]/g, Template.toPath(dep.userRequest));

            var block = new AsyncDependenciesBlock(
              {
                name: chunkName,
              },
              module,
              null,
              dep.require
            );
            block.addDependency(dep);
            module.addBlock(block);
          }
        }
      });
    });
    compiler.hooks.emit.tap(PLUGIN_NAME, function(compilation) {
      var json = {};
      compilation.chunkGroups.forEach(function(chunkGroup) {
        var chunkIds = chunkGroup.chunks.map(function(c) {
          return c.id;
        });

        function recordModule(id, mod) {
          // TODO: Hook into deps instead of the target module.
          // That way we know by the type of dep whether to include.
          // It also resolves conflicts when the same module is in multiple chunks.
          if (!/\.client\.js$/.test(mod.resource)) {
            return;
          }

          var moduleExports = {};
          ['', '*']
            .concat(mod.buildMeta.providedExports)
            .forEach(function(name) {
              moduleExports[name] = {
                id: id,
                chunks: chunkIds,
                name: name,
              };
            });
          var href = url.pathToFileURL(mod.resource).href;

          if (href !== undefined) {
            json[href] = moduleExports;
          }
        }

        chunkGroup.chunks.forEach(function(chunk) {
          chunk.getModules().forEach(function(mod) {
            recordModule(mod.id, mod); // If this is a concatenation, register each child to the parent ID.

            if (mod.modules) {
              mod.modules.forEach(function(concatenatedMod) {
                recordModule(mod.id, concatenatedMod);
              });
            }
          });
        });
      });
      var output = JSON.stringify(json, null, 2);
      compilation.assets[_this.manifestFilename] = {
        source: function() {
          return output;
        },
        size: function() {
          return output.length;
        },
      };
    });
  } // This attempts to replicate the dynamic file path resolution used for other wildcard
  // resolution in Webpack is using.

  resolveAllClientFiles(
    context,
    contextResolver,
    fs,
    contextModuleFactory,
    callback
  ) {
    asyncLib.map(
      this.clientReferences,
      function(clientReferencePath, cb) {
        if (typeof clientReferencePath === 'string') {
          cb(null, [new ClientReferenceDependency(clientReferencePath)]);
          return;
        }

        var clientReferenceSearch = clientReferencePath;
        contextResolver.resolve(
          {},
          context,
          clientReferencePath.directory,
          {},
          function(err, resolvedDirectory) {
            if (err) return cb(err);
            var options = {
              resource: resolvedDirectory,
              resourceQuery: '',
              recursive:
                clientReferenceSearch.recursive === undefined
                  ? true
                  : clientReferenceSearch.recursive,
              regExp: clientReferenceSearch.include,
              include: undefined,
              exclude: clientReferenceSearch.exclude,
            };
            contextModuleFactory.resolveDependencies(fs, options, function(
              err2,
              deps
            ) {
              if (err2) return cb(err2);
              var clientRefDeps = deps.map(function(dep) {
                var request = path.join(resolvedDirectory, dep.request);
                var clientRefDep = new ClientReferenceDependency(request);
                clientRefDep.userRequest = dep.userRequest;
                return clientRefDep;
              });
              cb(null, clientRefDeps);
            });
          }
        );
      },
      function(err, result) {
        if (err) return callback(err);
        var flat = [];

        for (var i = 0; i < result.length; i++) {
          flat.push.apply(flat, result[i]);
        }

        callback(null, flat);
      }
    );
  }
}
