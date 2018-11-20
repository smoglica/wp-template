const webpack = require('webpack');
const { PATHS, JS_FILENAME, PUBLIC_PATH } = require('./config');

// plugins
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  const isProduction = process.env.NODE_ENV === 'production' || (env && env.production);

  console.log('isPROD', env.production);

  return {
    context: __dirname,
    target: 'web',
    entry: {
      main: [PATHS.src('index')],
      home: './src/components/templates/home/index',
    },
    output: {
      path: PATHS.dist(),
      publicPath: PUBLIC_PATH,
      filename: JS_FILENAME,
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
    plugins: [new webpack.ProgressPlugin(), new CaseSensitivePathsPlugin()],
    resolve: {
      alias: {
        '@': PATHS.src(),
      },
    },
  };
};

const getScssLoaders = isProduction => {
  const use = ['css-loader', 'postcss-loader', 'sass-loader'];

  if (isProduction) {
    console.log('entra');
    use.unshift(MiniCssExtractPlugin.loader);
  } else {
    use.unshift('style-loader');
  }

  return use;
};

const getJsLoaders = isProduction => {
  const use = ['babel-loader'];

  if (!isProduction) {
    pushModuleHotAccept(use);
  }

  use.push('eslint-loader');

  return use;
};

/**
 * Adds module.hot.accept to the bottom of modules
 * if module.hot is not already present.
 *
 * @see {@link https://webpack.js.org/api/hot-module-replacement/}
 * @see {@link https://www.npmjs.com/package/webpack-module-hot-accept}
 */
const pushModuleHotAccept = use => {
  use.push('webpack-module-hot-accept');
};
