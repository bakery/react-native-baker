/**
 * Component Generator
 */

const path = require('path');
const componentExists = require('../utils/componentExists');
const specifyPlatform = require('../utils/specifyPlatform');
const templates = require('../utils/templates');

module.exports = function(plop) {

  // plop.addHelper('renderTemplate', function (templateName, data) {
  //   const templateFilePath = path.resolve(
  //     `./baker/generators/component/templates/${templateName}.js.hbs`
  //   );

  //   return plop.renderString(
  //     templates.getTemplateContent(templateFilePath),
  //     data || {}
  //   );
  // });

  return {
    description: 'Add an unconnected component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'Button',
        validate: value => {
          if ((/.+/).test(value)) {
            return componentExists(value) ? 'A component or container with this name already exists' : true;
          }

          return 'The name is required';
        },
      },
      // {
      //   type: 'list',
      //   name: 'templateName',
      //   message: 'Select component template',
      //   default: 'vanila',
      //   choices: () => {
      //     return templates.listAvailableTemplateNames(
      //       path.resolve('./baker/generators/component/templates')
      //     );
      //   }
      // },
      {
        type: 'confirm',
        name: 'platformSpecific',
        default: false,
        message: 'Do you want separate iOS and Android versions?',
      }
    ],
    actions: data => {
      const actions = [];
      const platforms = data.platformSpecific ? ['ios','android'] : [''];

      platforms.forEach((platform) => {
        actions.push({
          type: 'add',
          path: specifyPlatform('../../src/components/{{properCase name}}/index.js', platform),
          templateFile: './component/component.js.hbs',
          abortOnFail: true,
        });

        actions.push({
          type: 'add',
          path: specifyPlatform('../../src/components/{{properCase name}}/styles.js', platform),
          templateFile: './common/styles.js.hbs',
          abortOnFail: true,
        });
      });

      return actions;
    },
  };
};
