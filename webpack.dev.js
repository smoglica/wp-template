const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common')({ production: false });
const { HOST, PORT } = require('./config');

// plugins
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = () => {
  addHotMiddleware();

  return merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    watch: global.watch || false,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running @ http://${HOST}:${PORT}`],
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
