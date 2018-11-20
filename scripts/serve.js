global.watch = true;

const { PATHS, PROXY_TARGET } = require('../config');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const htmlInjector = require('bs-html-injector');
const webpackConfig = require('../webpack.dev')();
const bundler = webpack(webpackConfig);

// setup html injector, only compare differences within outer most div (#page)
// otherwise, it will replace the webpack HMR scripts
browserSync.use(htmlInjector, {
  /* restrictions: ['#page'] } */
});

(async () => {
  try {
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
          },
        },
      ],
      proxy: {
        // proxy local WP install
        target: PROXY_TARGET,
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
      open: false,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error starting Browsersync.', error);
  }
})();
