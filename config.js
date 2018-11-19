const path = require('path');
const { unipath } = require('./scripts/utils');

module.exports = {
  THEME_NAME: 'wp-template',
  PROXY_TARGET: 'localhost:8080',
  HOST: 'localhost',
  PORT: 3000,
  PATHS: {
    src: unipath('src'),
    dist: unipath(path.resolve(__dirname, 'dist')),
    modules: unipath('node_modules'),
    base: unipath('.'),
  },
};
