const path = require('path');

module.exports = {
  THEME_NAME: 'wp-template',
  PROXY_TARGET: 'localhost:8080',
  HOST: 'localhost',
  PORT: 3000,
  PATHS: {
    src: unipath('src'),
    compiled: unipath(path.resolve(__dirname, 'compiled')),
    dist: unipath(path.resolve(__dirname, 'dist')),
    modules: unipath('node_modules'),
    base: unipath('.'),
  }
};

function unipath(base) {
  return function() {
    const _paths = [base].concat(Array.from(arguments));
    return path.resolve(path.join.apply(null, _paths));
  }
}
