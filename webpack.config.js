const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { PATHS, HOST, PORT, THEME_NAME } = require('./config');

module.exports = env => {
  const production = process.env.NODE_ENV === 'production' || (env && env.production);

  return {
    context: __dirname,
    target: 'web',
    mode: production ? 'production' : 'development',
    devtool: production ? false : 'inline-source-map',
    entry: getEntry(production),
    watch: global.watch || false,
    output: {
      path: PATHS.dist(),
      publicPath: `//${HOST}:${PORT}/wordpress/wp-content/themes/${THEME_NAME}/`,
      filename: 'js/[name].js',
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
          include: PATHS.src(),
          use: getJsLoaders(production),
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          use: getScssLoaders(production),
        },
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
          use: ['file-loader'],
        },
      ],
    },
    resolve: {
      alias: {
        '@': PATHS.src(),
      },
    },
    plugins: getPlugins(production),
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
  };
};

const getEntry = production => {
  const entry = {
    main: [PATHS.src('index')],
    home: './src/components/templates/home/index',
  };

  /**
   * Loop through webpack entry
   * and add the hot middleware
   *
   * @see {@link https://github.com/webpack-contrib/webpack-hot-middleware#use-with-multiple-entry-points-in-webpack }
   */
  if (!production) {
    Object.keys(entry).forEach(name => {
      entry[name] = Array.isArray(entry[name]) ? entry[name].slice(0) : [entry[name]];
      entry[name].push('webpack-hot-middleware/client');
    });
  }

  return entry;
};

const getScssLoaders = production => {
  const use = ['css-loader', 'postcss-loader', 'sass-loader'];

  if (production) {
    use.unshift(MiniCssExtractPlugin.loader);
  } else {
    use.unshift('style-loader');
  }

  return use;
};

const getJsLoaders = production => {
  const use = ['babel-loader'];

  /**
   * Adds module.hot.accept to the bottom of modules
   * if module.hot is not already present.
   *
   * @see {@link https://webpack.js.org/api/hot-module-replacement/}
   * @see {@link https://www.npmjs.com/package/webpack-module-hot-accept}
   */
  if (!production) {
    use.push('webpack-module-hot-accept');
  }

  use.push('eslint-loader');

  return use;
};

const getPlugins = production => {
  const plugins = [
    new webpack.ProgressPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          production ? `Files built in ${PATHS.dist()}` : `You application is running at http://${HOST}:${PORT}`,
        ],
      },
    }),
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(production ? 'production' : 'development'),
      },
    }),
  ];

  if (production) {
    plugins.push(new CleanWebpackPlugin(PATHS.dist()));
    plugins.push(new MiniCssExtractPlugin({ filename: 'css/[name].css' }));
    plugins.push(
      new CopyWebpackPlugin([
        {
          from: PATHS.src('assets'),
          to: 'assets',
          toType: 'dir',
          ignore: ['.DS_Store'],
        },
      ])
    );
    plugins.push(
      new ImageminPlugin({
        pngquant: {
          quality: '95-100',
        },
      })
    );
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return plugins;
};
