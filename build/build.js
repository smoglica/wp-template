/* eslint-disable no-console */
const webpack = require('webpack');
const webpackProdConfig = require('./webpack.prod')();

console.log('> Building for production...\n');

webpack(webpackProdConfig, (err, stats) => {
  if (err) {
    throw err;
  }

  process.stdout.write(`${stats.toString(webpackProdConfig.stats)}\n\n`);

  if (stats.hasErrors()) {
    console.log('Build failed with errors.\n');
    process.exit(1);
  }

  console.log('Build complete.\n');
  console.log('Tip: built files are meant to be served over an HTTP server.');
});
