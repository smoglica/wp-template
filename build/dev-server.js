/* eslint-disable no-console */
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const htmlInjector = require('bs-html-injector');
const middleware = require('webpack-dev-middleware');
const { paths, proxyTarget, host, port } = require('../config');
const webpackDevConfig = require('./webpack.dev')(null, { hot: true });

/**
 * Loop through webpack entry
 * and add the hot middleware
 *
 * @see {@link https://github.com/webpack-contrib/webpack-hot-middleware#use-with-multiple-entry-points-in-webpack }
 */
const addHotMiddleware = () => {
  const { entry } = webpackDevConfig;

  Object.keys(entry).forEach(name => {
    entry[name] = Array.isArray(entry[name]) ? entry[name].slice(0) : [entry[name]];
    entry[name].push('webpack-hot-middleware/client');
  });
};

addHotMiddleware();

const bundler = webpack(webpackDevConfig);

// setup html injector, only compare differences within outer most div (#page)
// otherwise, it will replace the webpack HMR scripts
browserSync.use(htmlInjector, {
  /* restrictions: ['#page'] } */
});

const webpackDevMiddleware = middleware(bundler, {
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
