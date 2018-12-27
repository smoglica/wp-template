const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common')({ production: false });
const { host, port } = require('../config');

// plugins
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

/**
 * Loop through webpack entry
 * and add the hot middleware
 *
 * @see {@link https://github.com/webpack-contrib/webpack-hot-middleware#use-with-multiple-entry-points-in-webpack }
 */
const addHotMiddleware = () => {
  const { entry } = common;

  Object.keys(entry).forEach(name => {
    entry[name] = Array.isArray(entry[name]) ? entry[name].slice(0) : [entry[name]];
    entry[name].push('webpack-hot-middleware/client');
  });
};

module.exports = () => {
  addHotMiddleware();

  return merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    watch: true,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running at http://${host}:${port}`],
        },
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
    ],
  });
};
