const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:import/errors', 'plugin:import/warnings'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.common.js',
      },
    },
  },
  rules: {
    'no-var': 'error',
    'prefer-template': 'error',
    'no-console': isProduction ? 'error' : 'warn',
    'no-debugger': isProduction ? 'error' : 'warn',
    'arrow-body-style': ['error', 'as-needed'],
    'spaced-comment': ['error', 'always'],
    'object-shorthand': ['error', 'always'],
    'prefer-rest-params': 'error',
    'no-use-before-define': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
      },
    ],
  },
};
