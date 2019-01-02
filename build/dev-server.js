/* eslint-disable no-console */
const { paths, proxyTarget, host, port } = require('../config');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const htmlInjector = require('bs-html-injector');
const webpackDevConfig = require('./webpack.dev')();
const bundler = webpack(webpackDevConfig);

// setup html injector, only compare differences within outer most div (#page)
// otherwise, it will replace the webpack HMR scripts
browserSync.use(htmlInjector, {
  /* restrictions: ['#page'] } */
});

const webpackDevMiddleware = require('webpack-dev-middleware')(bundler, {
  publicPath: webpackDevConfig.output.publicPath,
  noInfo: true,
  logLevel: 'silent',
  stats: {
    colors: true,
  },
});

webpackDevMiddleware.waitUntilValid(() => {
  console.log(`\n> Listening at http://${host}:${port}\n`);
});

(async () => {
  console.log('> Starting dev server...');

  try {
    browserSync.init({
      logLevel: 'silent',
      open: false,
      files: [
        {
          // js changes are managed by webpack
          match: [`${paths.base()}/*.php`],
          // manually sync everything else
          fn(event, file) {
            if (file.endsWith('php')) {
              htmlInjector();
            }
          },
        },
      ],
      proxy: {
        // proxy local WP install
        target: proxyTarget,
        middleware: [
          // converts browsersync into a webpack-dev-server
          webpackDevMiddleware,
          // hot update js && css
          webpackHotMiddleware(bundler),
        ],
      },
    });
  } catch (error) {
    console.error('Error starting Browsersync.', error);
  }
})();
