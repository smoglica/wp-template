const { unipath } = require('./../build/utils');

module.exports = {
  themeName: 'wp-template',
  host: 'localhost',
  port: 3000,
  proxyTarget: 'localhost:8080',
  paths: {
    src: unipath('src'),
    dist: unipath('dist'),
    modules: unipath('node_modules'),
    base: unipath('.'),
  },
};
