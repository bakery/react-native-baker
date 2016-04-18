/**
 * Container Generator
 */

// const fs = require('fs');

const specifyPlatform = require('../utils/specifyPlatform');
const path = require('path');
const fs = require('fs');

module.exports = {
  description: 'Create React Native application',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'MyReactApp',
      validate: value => {
        return (/^[$A-Z_][0-9A-Z_$]*$/i).test(value);
      },
    },
  ],
  actions: data => {
    const platforms = ['ios','android'];
    const actions = [
      function setupReactNativeApp(answers) {
        var execFileSync = require('child_process').execFileSync;
        execFileSync(path.resolve(process.cwd(), 'baker/generators/utils/initRn.js'), [answers.name]);
        fs.unlinkSync(path.resolve(process.cwd(), 'index.ios.js'));
        fs.unlinkSync(path.resolve(process.cwd(), 'index.android.js'));
        return 'ok';
      }
    ];

    platforms.forEach((platform) => {
      actions.push({
        type: 'add',
        path: specifyPlatform('../../index.js', platform),
        templateFile: './app/index.js.hbs',
        abortOnFail: true,
      });
    });

    return actions;
  },
};
