const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = env => {
  const production = env && env.production;

  return {
    context: __dirname,
    target: 'web',
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-map' : 'cheap-module-eval-source-map',
    entry: {
      main: './src/index',
      home: './src/components/templates/home/index'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          include: path.resolve(__dirname, 'src'),
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
            loader: 'postcss-loader',
              options: {
                sourceMap: false,
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
          use: ['file-loader']
        }
      ]
    },
    resolve: {
      alias: {
        '@': path.resolve('src')
      }
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new BrowserSyncPlugin({
        files: ['**/*.php'],
        host: 'localhost',
        port: 3000
      })
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'common'
      // })
    ],
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          sourceMap: true,
          cache: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
  };
};
