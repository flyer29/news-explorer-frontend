const autoprefixer = require('autoprefixer');
const cssNano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer,
    cssNano({
      preset: 'default',
    }),
  ],
};
