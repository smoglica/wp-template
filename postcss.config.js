const { isProductionEnv } = require('./build/utils');

module.exports = () => ({
  plugins: {
    autoprefixer: {},
    cssnano: isProductionEnv
      ? {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        }
      : false,
  },
});
