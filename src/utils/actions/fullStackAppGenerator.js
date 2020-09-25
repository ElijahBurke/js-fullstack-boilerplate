/* eslint-disable no-unused-vars */
const inquirer = require('inquirer');
const shell = require('shelljs');
const fs = require('fs');

const commonForm = require('../../forms/index.form');
const frontendForm = require('../../forms/frontend.form');
const backendForm = require('../../forms/backend.form');
const installFrontForm = require('../../forms/install.frontend.form');
const installBackForm = require('../../forms/install.backend.form');

const createFile = require('../tools/fileWriter');

const { log } = require('../tools/logger');

// generate function for backend or frontend in folder structure
async function generateSubfolders(appFolderName, environment) {
  try {
    if (environment === 'backend') {
      await shell.cd(`${appFolderName}_${environment}`);
       
      log('Creating Backend folder structure', 'working');
      await shell.exec('mkdir controllers routers models');
      log('Backend folder structure created', 'success');
       
      await shell.cd(`..`);
    } else if (environment === 'frontend') {
       
      log('Creating Frontend folder structure', 'working');
      await shell.exec(`npx create-react-app  ${appFolderName}_client`)
      // await shell.cd(`${appFolderName}_client/src`);
      // await shell.exec('mkdir Components Containers store utils');
      log('Frontend folder structure created', 'success');
    }
  } catch (e) {
    log(`Error Generating ${environment} subfolders`, 'error');
    throw new Error(e);
  }
}

// start the app generation process

const createDirectories = async (appName) => {
  try {
    await shell.cd(`${appName}`);
    await shell.exec(`mkdir ${appName}_backend config ${appName}_client`); 
    await generateSubfolders(appName, 'backend');
    await generateSubfolders(appName, 'frontend');

  } catch (e) {
    log(`Error Generating ${appName} directories`, 'error');
    throw new Error(e);
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
    log('Package.json info required', 'attention');
    const common = await inquirer.prompt(commonForm);
    common.app_name.toLowerCase().split('').join('-');
    options.common = common;

    log('Frontend information required', 'attention');
     
    const frontend = await inquirer.prompt(frontendForm);
    options.frontend = frontend;

    log('Backend information required', 'attention');
     
    const backend = await inquirer.prompt(backendForm);
    options.backend = backend;

    return options;

  } catch (e) {
    log('Error while running the configuration forms', 'error');
    throw new Error(e);
  }
}

//install git for selected environment

const initGitFiles = async (appName, environment) => {
  try {
     
    log(`Initialising git for ${environment}`, 'working');

    await shell.cd(`${appName}_${environment === 'frontend' ? 'client' : environment}`);
    await shell.exec(`git init`);

    log(`${environment} git initialised`, 'success');
    await shell.cd(`..`);

  } catch (e) {
    log('Could not initialise Git', 'error');
    throw new Error(`could not initialise git, ${e}`);
  }
}

// install dependencies for selected environment
const installDependencies = async (appName, environment) => {
  try {
    log(`Installing ${environment}`, 'working');

    await shell.cd(`${appName}_${environment === 'frontend' ? 'client' : environment}`);
    await shell.exec(`npm i`);

    log(`${environment} installed`, 'success');
    await shell.cd(`..`);

  } catch (e) {
    log(`Error while loading the dependencies`, 'error');
    throw new Error();
  }
}
// generate function of entire app folder structure
async function buildFullStackApp(appName) {
  const requiredDep = ['git', 'npm', 'npx'];

  requiredDep.forEach(dep => {
    shell.which(dep);
    if (!shell.which(dep)) {
       log(`Sorry, this script requires ${dep}`, 'error');
      shell.exit(1);
    }
  });

  const types = ['common', 'backend']; 

  try {
    
    await shell.mkdir(`${appName}`);
    log('Root folder created', 'success');
    await createDirectories(appName);
    log('Subfolders created', 'success');
    
    const answers = await userForms(appName);
    log('Configuration info completed', 'success');

    log('Files generation in progress', 'working');
    types.forEach(type => require(`../../modules/${type}/common/config.json`).forEach(file => {
      createFile(answers, file, ['modules', type, 'common', 'templates'], type);
    }));

    log('Files generation completed', 'success');
     
  } catch (e) {
    log('Error creating the directory', 'error')
    throw new Error(e);
  }
  //install frontend git and dependencies
  try {
    log('Git and install info required - Frontend', 'attention');
    await inquirer.prompt(installFrontForm).then(async ans => {
      if (ans.git) {
        await initGitFiles(appName, 'frontend');
      } else {
        log('Skipping frontend Git Init', 'warning');
      }

      if (ans.install) {
        await installDependencies(appName, 'frontend');
      } else {
        log(`Skipping frontend installation`, 'warning');
      }
    });
  } catch (e) {
    throw new Error(e)
  }
  //install backend git and dependencies
  try {
    log('Git and install info required - Backend', 'attention')
    await inquirer.prompt(installBackForm).then(async ans => {
      if (ans.git) {
        await initGitFiles(appName, 'backend');
      } else {
         log('Skipping backend Git Init', 'warning');
      }

      if (ans.install) {
        await installDependencies(appName, 'backend');
      } else {
        log(`Skipping backend installation`, 'warning');
      }
    });
  } catch (e) {
    log('Error while configuring the backend', 'error')
    throw new Error(e)
  }

  log('🚀🚀🚀 Set up completed!! 🚀🚀🚀', 'finish')
}

module.exports = buildFullStackApp;
