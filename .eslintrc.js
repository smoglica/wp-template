module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  plugins: ['prettier'],
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'linebreak-style': ['error', 'unix']
  }
};
