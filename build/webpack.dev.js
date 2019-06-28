const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common')({ production: false });
const { proxyTarget } = require('../config');

// plugins
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = (env, argv) =>
  merge(webpackCommonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    watch: true,
    plugins: [
      !argv.hot &&
        new BrowserSyncPlugin(
          {
            proxy: proxyTarget,
            files: ['**/*.php'],
            open: false,
          },
          {
            injectCss: true,
          }
        ),
      argv.hot && new HotModuleReplacementPlugin(),
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
    ].filter(Boolean),
  });
