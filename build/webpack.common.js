const { paths, themeName } = require('../config');

// plugins
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const getScssLoaders = isProduction => {
  const use = ['css-loader', 'postcss-loader', 'sass-loader'];

  if (isProduction) {
    use.unshift(MiniCssExtractPlugin.loader);
  } else {
    use.unshift('style-loader');
  }

  return use;
};

const getJsLoaders = isProduction => {
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

  use.push('eslint-loader');

  return use;
};

module.exports = env => {
  const isProduction = (env && env.production) || process.env.NODE_ENV === 'production';

  return {
    context: __dirname,
    target: 'web',
    entry: {
      main: [paths.src('index')],
      home: [paths.src('components/templates/home/index')],
    },
    output: {
      path: paths.dist(),
      publicPath: `/wp-content/themes/${themeName}/`,
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
    },
    stats: {
      hash: false,
      children: false,
      errors: false,
      errorDetails: false,
      warnings: false,
      chunks: false,
      modules: false,
      reasons: false,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          include: paths.src(),
          use: getJsLoaders(isProduction),
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          use: getScssLoaders(isProduction),
        },
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
          use: ['file-loader'],
        },
      ],
    },
    plugins: [
      new WebpackBar(),
      new CaseSensitivePathsPlugin(),
      new StyleLintPlugin({
        syntax: 'scss',
        failOnError: isProduction,
      }),
    ],
    resolve: {
      alias: {
        '@': paths.src(),
      },
    },
  };
};
