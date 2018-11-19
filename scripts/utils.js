const path = require('path');

module.exports = {
  getEnv,
  unipath,
};

function getEnv() {
  const target = process.env.npm_lifecycle_event;

  switch (target) {
    case 'build':
      return 'production';
    case 'serve':
    case 'start':
    default:
      return 'development';
  }
}

function unipath(base) {
  return function() {
    const _paths = [base].concat(Array.from(arguments));
    return path.resolve(path.join.apply(null, _paths));
  };
}
