const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const publicDir = path.join(__dirname, '..', 'public');

module.exports = {
  srcDir,
  publicDir,
  componentDir: path.join(srcDir, 'components')
};