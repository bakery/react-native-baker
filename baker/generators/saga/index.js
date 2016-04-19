/**
 * Saga Generator
 */

/* globals ls:false */

require('shelljs/global');
var path = require('path');

module.exports = {
  description: 'Add a saga',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'requestData',
    validate: value => {
      if ((/.+saga/i).test(value)) {
        return 'The name should not end in "-saga", we add that for you!';
      }

      if ((/.+/).test(value)) {
        return true;
      }

      return 'The name is required';
    },
  },{
    type: 'list',
    name: 'templateName',
    message: 'Select saga template',
    default: 'vanila',
    choices: () => {
      return ls(path.resolve(process.cwd(), 'baker/generators/saga/templates/*.js.hbs')).map((file) => {
        var fileName = path.basename(file);
        return fileName.split('.js.hbs')[0];
      });
    },
  }],

  // Add the saga and the test for it
  actions: function(data) {
    return [
      {
        type: 'add',
        path: '../../src/sagas/{{camelCase name}}.saga.js',
        templateFile: `./saga/templates/${data.templateName}.js.hbs`,
        abortOnFail: true,
      },
      {
        type: 'modify',
        path: '../../src/sagas/index.js',
        pattern: /(\n\nexport default)/gi,
        template: '\nimport { {{camelCase name}} } from \'./{{camelCase name}}.saga\';$1',
      },
      {
        type: 'modify',
        path: '../../src/sagas/index.js',
        pattern: /(\n];)/gi,
        template: '\n  {{camelCase name}},$1',
      }
    ];
  },
};
