const path = require('path');
const { unipath } = require('./scripts/utils');

const PORT = 3000;
const HOST = 'localhost';
const THEME_NAME = 'wp-template';

module.exports = {
  THEME_NAME,
  HOST,
  PORT,
  PROXY_TARGET: 'localhost:8080',
  PATHS: {
    src: unipath('src'),
    dist: unipath(path.resolve(__dirname, 'dist')),
    modules: unipath('node_modules'),
    base: unipath('.'),
  },
  CSS_FILENAME: 'css/[name].css',
  JS_FILENAME: 'js/[name].js',
  PUBLIC_PATH: `//${HOST}:${PORT}/wordpress/wp-content/themes/${THEME_NAME}/`,
};
