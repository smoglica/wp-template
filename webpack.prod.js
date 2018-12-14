const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common')({ production: true });
const { paths, cssFilename } = require('./app.config');

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
          // cssProcessor: require('cssnano')({ zindex: false }),
          canPrint: false,
          cssProcessorOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            minChunks: 2,
          },
        },
      },
    },
    plugins: [
      new CleanWebpackPlugin(paths.dist()),
      new MiniCssExtractPlugin({ filename: cssFilename }),
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
        pngquant: {
          quality: '60',
        },
        plugins: [
          imageminMozjpeg({
            quality: 60,
          }),
        ],
      }),
    ],
  });
