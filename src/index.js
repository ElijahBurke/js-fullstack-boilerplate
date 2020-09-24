/* eslint-disable no-unused-vars */
const inquirer = require('inquirer');
var shell = require('shelljs');
const fs = require('fs');

const commonForm = require('./forms/index.form');
const frontendForm = require('./forms/frontend.form');
const backendForm = require('./forms/backend.form');
const createFile = require('./utils/tools/fileWriter');




//generate frontend folder structure || frontend with create-react-app
// generate function for backend folder structure

async function generateBackEnd(appFolderName, backendConfig) {
  //enter backend folder
  await shell.cd(`backend`);
  await shell.exec(`mkdir controllers routers models`);
  await shell.exec(`touch index.js config.js package.json`);
  //go back to root folder
  await shell.cd(`..`);
}

//run the forms in the terminal 

async function userForms() {
  let options = {
    frontend: {},
    backend: {},
    common: {}
  };

  try {
    const common = await inquirer.prompt(commonForm);
    common.app_name.toLowerCase().split('').join('-');
    options.common = common;
  
    const frontend = await inquirer.prompt(frontendForm);
    options.frontend = frontend;
  
    const backend = await inquirer.prompt(backendForm);
    options.backend = backend;
    return options;
  } catch (e) {
    console.log(e);
    return new Error(`Error running the forms, ${e}`);
  }



}
// start the app generation process


async function createDirectories(appName) {
  try {
    await shell.exec(`mkdir ${appName}`);
    await shell.cd(`${appName}`)
    await shell.exec(`mkdir backend client config`)
  } catch (e) {
    console.log(e);
  }
}
// generate function of entire app folder structure
async function generateFullStackApp(appName) {
  try {
    await createDirectories(appName);

    const answers = await userForms();
    const types = ['common']; //add frontend when ready
    types.forEach(type => require(`./modules/${type}/common/config.json`).forEach(file => {
      createFile(answers, file, ['modules', type, 'common', 'templates'], type);
    }));

  } catch (e) {
    console.log(e);
    throw new Error(`Error creating the directory, ${e}`);
  }

  // missing the creation of the dependencies in the package.json for backend and frontend
  // check what dependencies needs installing from each config file and then run shell cd to navigate in the folder and then run exec npm install

  // check if git init should also run
}

module.exports = {
  generateFullStackApp
}
