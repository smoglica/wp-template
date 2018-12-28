const { paths, themeName } = require('../config');
const { jsLoaders, scssLoaders } = require('./utils');

// plugins
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WebpackBar = require('webpackbar');
const StyleLintPlugin = require('stylelint-webpack-plugin');

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
          loader: 'eslint-loader',
          enforce: 'pre',
          include: paths.src(),
          exclude: /(node_modules|bower_components)/,
          options: {
            formatter: require('eslint-formatter-friendly'),
          },
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          include: paths.src(),
          use: jsLoaders(isProduction),
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          use: scssLoaders(isProduction),
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
