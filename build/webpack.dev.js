const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common')({ production: false });

/**
 * Loop through webpack entry
 * and add the hot middleware
 *
 * @see {@link https://github.com/webpack-contrib/webpack-hot-middleware#use-with-multiple-entry-points-in-webpack }
 */
const addHotMiddleware = () => {
  const { entry } = webpackCommonConfig;

  Object.keys(entry).forEach(name => {
    entry[name] = Array.isArray(entry[name]) ? entry[name].slice(0) : [entry[name]];
    entry[name].push('webpack-hot-middleware/client');
  });
};

module.exports = () => {
  addHotMiddleware();

  return merge(webpackCommonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    watch: true,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
    ],
  });
};
