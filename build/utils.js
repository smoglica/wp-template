const path = require('path');

const getEnv = () => {
  const target = process.env.npm_lifecycle_event;

  switch (target) {
    case 'build':
      return 'production';
    case 'serve':
    case 'start':
    default:
      return 'development';
  }
};

const unipath = base => (...args) => {
  const paths = [base].concat(Array.from(args));

  return path.resolve(path.join.apply(null, paths));
};

const scssLoaders = isProduction => {
  const use = ['css-loader', 'postcss-loader', 'sass-loader'];

  if (isProduction) {
    use.unshift(require('mini-css-extract-plugin').loader);
  } else {
    use.unshift('style-loader');
  }

  return use;
};

const jsLoaders = isProduction => {
  const use = ['babel-loader'];

  /**
   * Adds module.hot.accept to the bottom of modules
   * if module.hot is not already present.
   *
   * @see {@link https://webpack.js.org/api/hot-module-replacement/}
   * @see {@link https://www.npmjs.com/package/webpack-module-hot-accept}
   */
  if (!isProduction) {
    use.push('webpack-module-hot-accept');
  }

  return use;
};

module.exports = {
  getEnv,
  unipath,
  scssLoaders,
  jsLoaders,
};
