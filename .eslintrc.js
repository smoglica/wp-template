module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-var': 'error',
    'prefer-template': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
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
  },
};
