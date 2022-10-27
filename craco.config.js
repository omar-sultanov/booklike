// import 'path';
const path = require('path')
const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      '@models': resolvePath('src/models'),
      '@store': resolvePath('src/store'),
      '@components':resolvePath('src/components'),
      '@hooks':resolvePath('src/hooks')
    },
  },
};