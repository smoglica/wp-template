const { PATHS, HOST, PORT, THEME_NAME } = require('./config');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = env => {
  const isProduction = (process.env.NODE_ENV && process.env.NODE_ENV === 'production') || (env && env.production);

  return {
    context: __dirname,
    target: 'web',
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'inline-source-map',
    entry: getEntry(isProduction),
    watch: global.watch || false,
    output: {
      path: PATHS.dist(),
      publicPath: isProduction  ? '/' : `//${HOST}:${PORT}/wordpress/wp-content/themes/${THEME_NAME}/`,
      filename: 'js/[name].js',
      sourceMapFilename: 'js/[file].map'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          include: PATHS.src(),
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          use: getScssLoaders(isProduction)
        },
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
          use: ['file-loader']
        }
      ]
    },
    resolve: {
      alias: {
        '@': PATHS.src()
      }
    },
    plugins: getPlugins(isProduction),
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          sourceMap: true,
          cache: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin()
      ]
    }
  };
};

const getEntry = isProduction => {
  const entry = {
    main: [PATHS.src('index')],
    home: './src/components/templates/home/index'
  };

  if (!isProduction) {
    for (const [key, value] of Object.entries(entry)) {
      if (Array.isArray(value)) {
        entry[key].push('webpack-hot-middleware/client');
      }
    }
  }

  return entry;
};

const getScssLoaders = isProduction => {
  const use = [
    'css-loader',
    'postcss-loader',
    'sass-loader'
  ];

  if (isProduction) {
    use.unshift(MiniCssExtractPlugin.loader);
  } else {
    use.unshift('style-loader');
  }

  return use;
};

const getPlugins = isProduction => {
  const plugins = [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development')
      }
    })
  ];

  if (isProduction) {
    plugins.push(new MiniCssExtractPlugin({ filename: 'css/[name].css' }));
    plugins.push(new CopyWebpackPlugin([{ from: PATHS.src('assets'), to: 'assets' }]));
    plugins.push(new ImageminPlugin({
      disable: !isProduction,
      pngquant: {
        quality: '95-100'
      }
    }));
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoEmitOnErrorsPlugin());
  }

  return plugins;
};
