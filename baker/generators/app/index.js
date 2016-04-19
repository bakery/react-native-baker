/* globals which, rm */

/**
 * Container Generator
 */

require('shelljs/global');

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
      function killCurrentGitIgnore() {
        const currentGitIgnore = path.resolve(process.cwd(),'.gitignore');
        if (which(currentGitIgnore)) {
          rm(currentGitIgnore);
        }
        return 'ok';
      },
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

    actions.push({
      type: 'modify',
      path: '../../.gitignore',
      pattern: /()^.*/gi,
      templateFile: './app/.gitignore.hbs',
    });

    return actions;
  },
};
