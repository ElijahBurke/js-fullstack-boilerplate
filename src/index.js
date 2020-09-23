/* eslint-disable no-unused-vars */
const inquirer = require('inquirer');
var shell = require('shelljs');

const fs = require('fs');
const configForm = require('./forms/index.form');
const frontendForm = require('./forms/frontend.form');
const backendForm = require('./forms/backend.form');

async function generateFullStackApp(appName) {

  let config = {
    frontend: {},
    backend: {},
    config: {}
  };

  // eslint-disable-next-line no-unused-vars
  await shell.exec(`mkdir ${appName}`);
  await shell.cd(`${appName}`)

  const configAnswers = await inquirer.prompt(configForm);
  config.config = configAnswers;

  const frontendAnswers = await inquirer.prompt(frontendForm);
  config.frontend = frontendAnswers;
  
  const backendAnswers = await inquirer.prompt(backendForm);
  config.backend = backendAnswers;

  await shell.exec(`mkdir ${config.config.app_name}_backend ${config.config.app_name}_frontend config`)
  await shell.exec(`touch package.json readme.md ./config/fsAppConfig.js`);
}

module.exports = {
  generateFullStackApp
}
