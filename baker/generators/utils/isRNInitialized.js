var fs = require('fs');
var path = require('path');

function isRNInitialized () {
  const checks = [
    path.resolve(process.cwd(), 'ios'),
    path.resolve(process.cwd(), 'android'),
    path.resolve(process.cwd(), 'index.ios.js'),
    path.resolve(process.cwd(), 'index.android.js'),
  ];

  try {
    checks.forEach((f) => {
      console.error('checking', path.resolve(process.cwd(), f));
      fs.statSync(path.resolve(process.cwd(), f));
    });
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = isRNInitialized;
