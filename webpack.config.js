// Setup webpack.config.js
const libraryName = 'defacto';

const webpack = require('webpack');
const path = require('path');
const outputFile = libraryName + '.js';

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        enforce: "pre",
        test: /(\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          quiet:true
          //useESlintrc:false,
          //rules: { indent: ['error', 2] }
        }
      }
    ]
  },
  resolve: {
    modules: ["src"],
    extensions: ['.js']
  }
};

module.exports = config;
