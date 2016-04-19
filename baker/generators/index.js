/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const isRNInitialized = require('./utils/isRNInitialized');
const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const appGenerator = require('./app/index.js');
const sagaGenerator = require('./saga/index.js');

module.exports = (plop) => {
  if (isRNInitialized()) {
    plop.setGenerator('component', componentGenerator);
    plop.setGenerator('container', containerGenerator);
    plop.setGenerator('saga', sagaGenerator);
  } else {
    plop.setGenerator('app', appGenerator);
  }

  // plop.setGenerator('selector', selectorGenerator);
  // plop.setGenerator('route', routeGenerator);
};
