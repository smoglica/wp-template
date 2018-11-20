const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common')({ production: true });
const { PATHS, CSS_FILENAME } = require('./config');

// plugins
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => {
  return merge(common, {
    mode: 'production',
    devtool: false,
    optimization: {
      noEmitOnErrors: true,
      minimizer: [
        new UglifyJSPlugin({
          sourceMap: true,
          cache: true,
          parallel: true,
        }),
        new OptimizeCSSAssetsPlugin(),
      ],
      // runtimeChunk: false,
      // splitChunks: {
      //   cacheGroups: {
      //     default: false,
      //     commons: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name: 'vendor',
      //       chunks: 'all',
      //       minChunks: 2
      //     }
      //   }
      // }
    },
    plugins: [
      new CleanWebpackPlugin(PATHS.dist()),
      new MiniCssExtractPlugin({ filename: CSS_FILENAME }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Files built in ${PATHS.dist()}`],
        },
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new CopyWebpackPlugin([
        {
          from: PATHS.src('assets'),
          to: 'assets',
          toType: 'dir',
          ignore: ['.DS_Store'],
        },
      ]),
      new ImageminPlugin({
        pngquant: {
          quality: '95-100',
        },
      }),
    ],
  });
};
