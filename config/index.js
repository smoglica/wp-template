const { unipath } = require('./../build/utils');

module.exports = {
  themeName: '<%= conf.get("themeDir") %>',
  host: 'localhost',
  port: '<%= conf.get("browsersyncPort") %>',
  proxyTarget: '<%= conf.get("host") %>:<%= conf.get("port") %>',
  paths: {
    src: unipath('src'),
    dist: unipath('dist'),
    modules: unipath('node_modules'),
    base: unipath('.'),
  },
};
