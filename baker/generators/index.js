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

  const loadGenerator = (generator) => {
    return typeof generator === 'function' ?
      generator.call(null, plop) : generator;
  };

  if (isRNInitialized()) {
    plop.setGenerator('component', loadGenerator(componentGenerator));
    plop.setGenerator('container', loadGenerator(containerGenerator));
    plop.setGenerator('saga', loadGenerator(sagaGenerator));
  } else {
    plop.setGenerator('app', loadGenerator(appGenerator));
  }

  // plop.setGenerator('selector', selectorGenerator);
  // plop.setGenerator('route', routeGenerator);
};
