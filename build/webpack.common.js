// plugins
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WebpackBar = require('webpackbar');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const eslintFormatterFriendly = require('eslint-formatter-friendly');

const { jsLoaders, scssLoaders } = require('./utils');
const { paths, themeName } = require('../config');

module.exports = env => {
  const isProduction = (env && env.production) || process.env.NODE_ENV === 'production';

  return {
    context: paths.base(),
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
      colors: true,
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
            formatter: eslintFormatterFriendly,
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
          test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
          exclude: paths.src('assets', 'icons'),
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: `assets/images/[name].[ext]`,
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.(svg)(\?.*)?$/,
          include: paths.src('assets', 'icons'),
          use: [
            'svg-sprite-loader',
            {
              loader: 'svgo-loader',
              options: {
                plugins: [{ removeTitle: true }, { convertPathData: false }, { removeUselessStrokeAndFill: true }],
              },
            },
          ],
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: `assets/media/[name].[ext]`,
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: `assets/fonts/[name].[ext]`,
                  },
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new WebpackBar(),
      new CaseSensitivePathsPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new StyleLintPlugin({
        syntax: 'scss',
        context: paths.src(),
        files: '**/*.scss',
        failOnError: isProduction,
      }),
      new CopyWebpackPlugin([
        {
          from: paths.src('assets'),
          to: 'assets',
          toType: 'dir',
          ignore: ['.DS_Store', '.gitkeep'],
        },
      ]),
    ],
    resolve: {
      alias: {
        '@': paths.src(),
        '@@': paths.base(),
        '~': paths.modules(),
      },
    },
  };
};
