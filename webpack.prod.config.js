/* eslint-disable */
const merge = require('webpack-merge');
// Plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// Configs
const baseConfig = require('./webpack.config.babel');

const prodConfiguration = env => {
  return merge([{
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      minimizer: [new UglifyJsPlugin()],
    },
  }, ]);
}

module.exports = env => {
  return merge(baseConfig(env), prodConfiguration(env));
}
