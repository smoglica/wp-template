const { paths, proxyTarget } = require('../config');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const htmlInjector = require('bs-html-injector');
const webpackConfig = require('./webpack.dev')();
const bundler = webpack(webpackConfig);

// setup html injector, only compare differences within outer most div (#page)
// otherwise, it will replace the webpack HMR scripts
browserSync.use(htmlInjector, {
  /* restrictions: ['#page'] } */
});

(async () => {
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
          webpackDevMiddleware(bundler, {
            publicPath: webpackConfig.output.publicPath,
            noInfo: true,
            logLevel: 'silent',
            stats: {
              colors: true,
            },
          }),
          // hot update js && css
          webpackHotMiddleware(bundler),
        ],
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error starting Browsersync.', error);
  }
})();
