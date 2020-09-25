/* eslint-disable no-unused-vars */
const inquirer = require('inquirer');
var shell = require('shelljs');
const fs = require('fs');

const commonForm = require('./forms/index.form');
const frontendForm = require('./forms/frontend.form');
const backendForm = require('./forms/backend.form');
const installFrontForm = require('./forms/install.frontend.form');
const installBackForm = require('./forms/install.backend.form');

const createFile = require('./utils/tools/fileWriter');




//generate frontend folder structure || frontend with create-react-app

// generate function for backend or frontend in folder structure

async function generateSubfolders(appFolderName, environment) {
  await shell.cd(`${appFolderName}_${environment}`);
  if (environment === 'backend') {
    shell.echo('');
    shell.echo('Creating Backend folder structure');
    await shell.exec(`mkdir controllers routers models`);
    shell.echo('Backend folder structure created');
    shell.echo('');
  } else if (environment === 'frontend') {
    shell.echo('');
    shell.echo('Creating Frontend folder structure');
    shell.echo('Creating frontend');
    shell.echo('Frontend folder structure created');
    shell.echo('');
  }
  // return to root folder
  await shell.cd(`..`);
}

// start the app generation process

const createDirectories = async (appName) => {
  try {
    await shell.exec(`mkdir ${appName}`);
    await shell.cd(`${appName}`)
    await shell.exec(`mkdir ${appName}_backend config`)
    await shell.exec(`npx create-react-app  ${appName}_client`);
    shell.echo('')
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
    shell.echo(' ------ Set up the common App ------ ');
    shell.echo('');
    const common = await inquirer.prompt(commonForm);
    common.app_name.toLowerCase().split('').join('-');
    options.common = common;

    shell.echo('');
    shell.echo(' ------ Set up the frontend of the App ------ ');
    shell.echo('');
    const frontend = await inquirer.prompt(frontendForm);
    options.frontend = frontend;

    shell.echo('');
    shell.echo(' ------ Set up the backend of the App ------ ');
    shell.echo('');
    const backend = await inquirer.prompt(backendForm);
    options.backend = backend;

    return options;

  } catch (e) {
    console.log(e);
    return new Error(`Error running the forms, ${e}`);
  }
}

//install git for selected environment

const initGitFiles = async (appName, environment) => {
  try {
    shell.echo('');
    shell.echo(` ------ Initialising git for ${environment} ------ `);
    shell.echo('');

    await shell.cd(`${appName}_${environment === 'frontend' ? 'client' : environment}`);
    await shell.exec(`git init`);

    shell.echo('');
    shell.echo(` ------ ${environment} git initialised ------ `);
    shell.echo('');

    await shell.cd(`..`);
  } catch (e) {
    throw new Error(`could not initialise git, ${e}`);
  }
}

// install dependencies for selected environment
const installDependencies = async (appName, environment) => {
  try {
    shell.echo('');
    shell.echo(` ------ Installing ${environment} ------ `);
    shell.echo('');

    await shell.cd(`${appName}_${environment==='frontend' ? 'client' : environment}`);
    await shell.exec(`npm i`);

    shell.echo('');
    shell.echo(` ------ ${environment} installed ------ `);
    shell.echo('');
    await shell.cd(`..`);
  } catch (e) {
    throw new Error(`could not install dependencies, ${e}`);
  }
}
// generate function of entire app folder structure
async function generateFullStackApp(appName) {
  const requiredDep = ['git', 'npm', 'npx'];

  requiredDep.forEach(dep => {
    if (!shell.which(dep)) {
      shell.echo(`Sorry, this script requires ${dep}`);
      shell.exit(1);
    }
  });
  
  const types = ['common', 'backend']; //add frontend when ready
  try {
    shell.echo('');
    shell.echo(' ------ Creating Root Folder ------ ');
    shell.echo('');

    await createDirectories(appName);

    shell.echo('');
    shell.echo(' ------ Root folder created ------ ');
    shell.echo('');

    const answers = await userForms(appName);
    
    shell.echo('');
    shell.echo(' ------ Files generation in progress ------ ');
    shell.echo('');

    types.forEach(type => require(`./modules/${type}/common/config.json`).forEach(file => {
      createFile(answers, file, ['modules', type, 'common', 'templates'], type);
    }));
    
    shell.echo('');
    shell.echo(' ------ Files generation completed, happy coding! ------ ');
    shell.echo('');

  } catch (e) {
    throw new Error(`Error creating the directory, ${e}`);
  }
  //install frontend git and dependencies
  try {
    await inquirer.prompt(installFrontForm).then(async ans => {
      if (ans.git) {
        await initGitFiles(appName, 'frontend');
      } else {
        shell.echo(' ------ Skipping frontend Git Init ------ ');
      }

      if (ans.install) {
        await installDependencies(appName, 'frontend');
      } else {
        shell.echo(` ------ Skipping frontend installation ------ `);
      }
    });
  } catch (e) {
    throw new Error(e)
  }
//install backend git and dependencies
  try {
    await inquirer.prompt(installBackForm).then(async ans => {
      if (ans.git) {
        await initGitFiles(appName, 'backend');
      } else {
        shell.echo(' ------ Skipping backend Git Init ------ ');
      }

      if (ans.install) {
        await installDependencies(appName, 'backend');
      } else {
        shell.echo(` ------ Skipping backend installation ------ `);
      }
    });
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = {
  generateFullStackApp
}
