const { unipath } = require('./../build/utils');

module.exports = {
  themeName: '<%= conf.get("themeDir") %>',
  host: 'localhost',
  port: 3000,
  proxyTarget: '<%= conf.get("url") %>',
  paths: {
    src: unipath('src'),
    dist: unipath('dist'),
    modules: unipath('node_modules'),
    base: unipath('.'),
  },
};
