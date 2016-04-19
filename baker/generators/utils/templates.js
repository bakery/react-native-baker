/* globals ls: false, cat: false */

var path = require('path');
require('shelljs/global');

module.exports = {
  listAvailableTemplateNames(directoryFullPath) {
    console.error('looking in', directoryFullPath);
    return ls(path.resolve(directoryFullPath, '*.js.hbs')).map((file) => {
      var fileName = path.basename(file);
      return fileName.split('.js.hbs')[0];
    });
  },

  getTemplateContent(file) {
    return cat(file);
  }
};
