// Setup webpack.config.js
const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    defacto    : "./src/index.js",
    defactoInternal: "./src/internal/index.js"
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "lib"),
    filename: "[name].js",
    library: ["[name]"],
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
