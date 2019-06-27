const { BannerPlugin, DefinePlugin } = require('webpack');
const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common')({ production: true });
const { paths } = require('../config');
const { name, version } = require('../package.json');

// plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = () =>
  merge(webpackCommonConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
      publicPath: '/',
    },
    optimization: {
      noEmitOnErrors: true,
      runtimeChunk: false,
      minimizer: [
        new UglifyJSPlugin({
          sourceMap: true,
          uglifyOptions: {
            compress: {
              inline: false,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({
          canPrint: false,
          cssProcessorOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
            minChunks: 2,
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        optipng: {
          optimizationLevel: 7,
        },
        gifsicle: {
          optimizationLevel: 3,
        },
        pngquant: {
          quality: '65-90',
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              removeUnknownsAndDefaults: false,
            },
            {
              cleanupIDs: false,
            },
            {
              removeViewBox: false,
            },
          ],
        },
        plugins: [
          imageminMozjpeg({
            quality: 75,
          }),
        ],
      }),
      new CopyWebpackPlugin(['**/*'], {
        context: paths.base(),
        ignore: [
          'vendor/**/*',
          'node_modules/**/*',
          'src/**/*',
          'dist/**/*',
          'bin/**/*',
          '.*',
          '*.js',
          '*.json',
          '*.lock',
          '*.dist',
        ],
      }),
      new BannerPlugin(
        [
          'Name: [name]',
          'File: [file]',
          'Hash: [hash]',
          'Chunkhash: [chunkhash]',
          `Generated on: ${Date.now()}`,
          `Package: ${name}`,
          `Version: v${version}`,
        ].join('\n')
      ),
      new CleanWebpackPlugin(paths.dist(), {
        root: paths.base(),
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].css',
      }),
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
  });
