const path = require('path');
const rimraf = require('rimraf');
const meta = require('./meta');

const isProduction = process.env.NODE_ENV === 'production';
rimraf.sync(path.resolve(__dirname, '../build'));

/** @type{import('@rspack/cli').Configuration} */
const config = {
  mode: isProduction ? 'production' : 'development',
  devtool: false,
  entry: [path.resolve(__dirname, '../src/framework/bootstrap.js')],
  output: {
    clean: true,
    path: path.resolve(__dirname, '../build'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // Rspack doesn't need to use babel-loader to transpile jsx syntax
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  builtins: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
    html: [
      {
        template: path.resolve(__dirname, '../public/index.html'),
      },
    ],
    reactFlight: {
      clientReferences: meta.clientFiles,
      clientFileName: require.resolve('react-server-dom-webpack/client.browser'),
    },
  },
  resolve: {
    alias: {
      'react-error-boundary':
        '/Users/bytedance/Documents/forked/server-components-demo-on-rspack/node_modules/react-error-boundary/dist/react-error-boundary.esm.js',
    },
  },
  optimization: {
    splitChunks: false,
  },
  plugins: [
    //   new HtmlWebpackPlugin({
    //     inject: true,
    //     template: path.resolve(__dirname, '../public/index.html'),
    //   }),
    //   new ReactServerWebpackPlugin({isServer: false}),
  ],
};

module.exports = config;
