/* eslint-disable no-unused-vars */
const inquirer = require('inquirer');
var shell = require('shelljs');
const fs = require('fs');

const configForm = require('./forms/index.form');
const frontendForm = require('./forms/frontend.form');
const backendForm = require('./forms/backend.form');
const createFile = require('./utils/tools/fileWriter');

//generate function for frontend folder structure

// generate function for backend folder structure

async function generateBackEnd(appFolderName, backendConfig) {
  //enter backend folder
  await shell.cd(`backend`);
  await shell.exec(`mkdir controllers routers models`);
  await shell.exec(`touch index.js config.js package.json`);
  //go back to root folder
  await shell.cd(`..`);
}

// generate function of entire app folder structure
async function generateFullStackApp(appName) {

  let options = {
    frontend: {},
    backend: {},
    common: {}
  };

  // eslint-disable-next-line no-unused-vars
  await shell.exec(`mkdir ${appName}`);
  await shell.cd(`${appName}`)

  const configAnswers = await inquirer.prompt(configForm);
  options.common = configAnswers;

  const frontendAnswers = await inquirer.prompt(frontendForm);
  options.frontend = frontendAnswers;
  
  const backendAnswers = await inquirer.prompt(backendForm);
  options.backend = backendAnswers;

  await shell.exec(`mkdir backend client config`)
  // await shell.exec(`touch package.json readme.md ./config/fsAppConfig.js`);
  // await generateBackEnd(options.common.app_name, options.backend);
  const types = ['common'];

  types.forEach(type => require(`./modules/${type}/common/config.json`).forEach(file => {
    createFile(options, file, ['modules', type, 'common', 'templates'], type);
  }));
}

module.exports = {
  generateFullStackApp
}
