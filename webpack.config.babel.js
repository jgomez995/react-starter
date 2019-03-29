/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  const {
    PLATFORM,
    VERSION
  } = env;
  return merge([{
    entry: ['@babel/polyfill','./src/index.jsx'],
    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.template.html',
        filename: './index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.VERSION': JSON.stringify(env.VERSION),
        'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
      }),
      new CopyWebpackPlugin([{
        from: 'src/static'
      }]),
    ],
  }])
};
