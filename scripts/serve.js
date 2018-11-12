global.watch = true;

const { PATHS, PROXY_TARGET } = require('../config');
const path = require('path');
const fs = require('fs-extra');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const htmlInjector = require('bs-html-injector');
const webpackConfig = require('../webpack.config')();

const bundler = webpack(webpackConfig);

browserSync.use(htmlInjector, { restrictions: ['#page'] });

(async () => {
  await fs.emptyDir(PATHS.compiled());

  browserSync.init({
    files: [
      {
        // js changes are managed by webpack
        match: [`${PATHS.base()}/*.php`],
        // manually sync everything else
        fn(event, file) {
          if (file.endsWith('php')) {
            htmlInjector();
          }
        }
      }
    ],
    proxy: {
      // proxy local WP install
      target: PROXY_TARGET,
      middleware: [
        // converts browsersync into a webpack-dev-server
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          noInfo: true
        }),
        // hot update js && css
        webpackHotMiddleware(bundler)
      ]
    },
    open: false
  });
})();
