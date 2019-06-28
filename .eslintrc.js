// npx eslint --fix .eslintrc.js --ignore-pattern '!.eslintrc.js'

const { isProductionEnv } = require('./build/utils');

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.common.js',
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': isProductionEnv() ? 'error' : 'warn',
    'no-debugger': isProductionEnv() ? 'error' : 'warn',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
      },
    ],
  },
};
