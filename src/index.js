/* eslint-disable no-unused-vars */
const inquirer = require('inquirer');
var shell = require('shelljs');
const fs = require('fs');

const commonForm = require('./forms/index.form');
const frontendForm = require('./forms/frontend.form');
const backendForm = require('./forms/backend.form');
const createFile = require('./utils/tools/fileWriter');




//generate frontend folder structure || frontend with create-react-app

// generate function for backend or frontend in folder structure

async function generateSubfolders(appFolderName, environment) {
  await shell.cd(`${appFolderName}_${environment}`);
  if (environment === 'backend') {
    await shell.echo('');
    await shell.echo('Creating Backend folder structure');
    await shell.exec(`mkdir controllers routers models`);
    await shell.echo('Backend folder structure created');
    await shell.echo('');
  } else if (environment === 'frontend') {
    await shell.echo('');
    await shell.echo('Creating Frontend folder structure');
    await shell.echo('Creating frontend');
    await shell.echo('Frontend folder structure created');
    await shell.echo('');
  }
  // return to root folder
  await shell.cd(`..`);
  
}

// start the app generation process

async function createDirectories(appName) {
  try {
    await shell.exec(`mkdir ${appName}`);
    await shell.cd(`${appName}`)
    await shell.exec(`mkdir ${appName}_backend ${appName}_client config`)
    
    await generateSubfolders(appName, 'backend');
  
  } catch (e) {
    console.log(e);
  }
}

//run the forms in the terminal 

async function userForms(appName) {
  let options = {
    app_name: appName,
    frontend: {},
    backend: {},
    common: {}
  };

  try {
    await shell.echo(' ------ Set up the common App ------ ');
    await shell.echo('');
    const common = await inquirer.prompt(commonForm);
    common.app_name.toLowerCase().split('').join('-');
    options.common = common;

    await shell.echo('');
    await shell.echo(' ------ Set up the frontend of the App ------ ');
    await shell.echo('');
    const frontend = await inquirer.prompt(frontendForm);
    options.frontend = frontend;

    await shell.echo('');
    await shell.echo(' ------ Set up the backend of the App ------ ');
    await shell.echo('');
    const backend = await inquirer.prompt(backendForm);
    options.backend = backend;

    return options;

  } catch (e) {
    console.log(e);
    return new Error(`Error running the forms, ${e}`);
  }
}

// generate function of entire app folder structure
async function generateFullStackApp(appName) {
  try {
    await shell.echo('');
    await shell.echo(' ------ Creating Root Folder ------ ');
    await shell.echo('');
    await createDirectories(appName);
    await shell.echo('');
    await shell.echo(' ------ Root folder created ------ ');
    await shell.echo('');

    const answers = await userForms(appName);
    const types = ['common', 'backend']; //add frontend when ready
    await shell.echo('');
    await shell.echo(' ------ Files generation in progress ------ ');
    await shell.echo('');
    types.forEach(type => require(`./modules/${type}/common/config.json`).forEach(file => {
      createFile(answers, file, ['modules', type, 'common', 'templates'], type);
    }));
    await shell.echo('');
    await shell.echo(' ------ Files generation completed, happy coding! ------ ');
    await shell.echo('');
  } catch (e) {
    throw new Error(`Error creating the directory, ${e}`);
  }

  // missing the creation of the dependencies in the package.json for backend and frontend
  // check what dependencies needs installing from each config file and then run shell cd to navigate in the folder and then run exec npm install

  // check if git init should also run
}

module.exports = {
  generateFullStackApp
}
