const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common')({ production: true });
const { paths } = require('../config');
const packageJson = require('../package.json');

// plugins
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = () =>
  merge(common, {
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
      new webpack.BannerPlugin(`
        Name: [name]
        File: [file]
        Hash: [hash]
        Chunkhash: [chunkhash]
        Generated on: ${Date.now()}
        Package: ${packageJson.name}
        Version: v${packageJson.version}
      `),
      new CleanWebpackPlugin(paths.dist(), {
        root: paths.base(),
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].css',
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Files built in ${paths.dist()}`],
        },
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new CopyWebpackPlugin([
        {
          from: paths.src('assets'),
          to: 'assets',
          toType: 'dir',
          ignore: ['.DS_Store'],
        },
      ]),
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
    ],
  });
