/**
 * Component Generator
 */

const componentExists = require('../utils/componentExists');
const specifyPlatform = require('../utils/specifyPlatform');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
  // {
  //   type: 'list',
  //   name: 'type',
  //   message: 'Select the type of component',
  //   default: 'Stateless Function',
  //   choices: () => ['ES6 Class', 'Stateless Function'],
  // },
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


    // TODO: tests
    // {
    //   type: 'add',
    //   path: '../../src/components/{{properCase name}}/index.test.js',
    //   templateFile: './component/test.js.hbs',
    //   abortOnFail: true,
    // }

    return actions;
  },
};
