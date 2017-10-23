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
  externals: {
    ramda: 'ramda'
  },
  module: {
    loaders: [
        {
            test: /(\.js)$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            options: {
                presets: ['flow']
            }
        },
        {
            //enforce: "pre",
            test: /(\.js)$/,
            loader: "eslint-loader",
            include: [
                path.resolve(__dirname, "src"),
                path.resolve(__dirname, "src/internal")
            ],
            options: {
                quiet:true
                //useESlintrc:false,
                //rules: { indent: ['error', 2] }
            }
        }
    ]
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: ['.js']
  }
};

module.exports = config;
