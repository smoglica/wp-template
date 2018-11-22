const { unipath } = require('./scripts/utils');

const PORT = 3000;
const HOST = 'localhost';
const THEME_NAME = 'wp-template';

module.exports = {
  themeName: THEME_NAME,
  host: HOST,
  port: PORT,
  proxyTarget: 'localhost:8080',
  cssFilename: 'css/[name].css',
  jsFilename: 'js/[name].js',
  publicPath: `//${HOST}:${PORT}/wordpress/wp-content/themes/${THEME_NAME}/`,
  paths: {
    src: unipath('src'),
    dist: unipath('dist'),
    modules: unipath('node_modules'),
    base: unipath('.'),
  },
};
