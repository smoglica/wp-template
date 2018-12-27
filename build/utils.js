const path = require('path');

const getEnv = () => {
  const target = process.env.npm_lifecycle_event;

  switch (target) {
    case 'build':
      return 'production';
    case 'serve':
    case 'start':
    default:
      return 'development';
  }
};

const unipath = base => (...args) => {
  const paths = [base].concat(Array.from(args));

  return path.resolve(path.join.apply(null, paths));
};

module.exports = {
  getEnv,
  unipath,
};
