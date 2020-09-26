/* eslint-disable no-unused-vars */
const inquirer = require('inquirer');
const shell = require('shelljs');
const fs = require('fs');
const process = require('process');

const commonForm = require('../../forms/index.form');
const frontendForm = require('../../forms/frontend.form');
const backendForm = require('../../forms/backend.form');
const installFrontForm = require('../../forms/install.frontend.form');
const installBackForm = require('../../forms/install.backend.form');

const createFile = require('../tools/fileWriter');

const { log } = require('../tools/logger');

//generate frontend

const generateFrontend = async (appName) => {
  log('Initialising frontend', 'working');

  await new Promise((resolve, reject) => {
    shell.exec(
      `npx create-react-app ${appName}_client --template js-fullstack-app-frontend`, function (
        error
      ) {
      if (error) {
        console.log('exec error: ' + error);
        // Reject if there is an error:
        return reject(error);
      }
      // Otherwise resolve the promise:
      resolve();
    });
  });

  log('Frontend initialised correctly', 'success');
  log('');
};

// start the app generation process

const createDirectories = async (appName) => {
  try {
    process.chdir(`${appName}`);
    console.log('New directory: ' + process.cwd());
    await shell.exec(`mkdir ${appName}_backend config`);
    // await generateSubfolders(appName, 'backend');
  } catch (e) {
    log(`Error Generating ${appName} directories`, 'error');
    throw new Error(e);
  }
};

//run the forms in the terminal

async function userForms(appName) {
  let options = {
    app_name: appName,
    frontend: {},
    backend: {},
    common: {},
  };

  try {
    log('Package.json information required', 'attention');
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

    process.chdir(
      `${
        environment === 'frontend'
          ? `${appName}_client`
          : `${appName}_${environment}`
      }`
    );
    console.log('New directory: ' + process.cwd());
    await shell.exec(`git init`);

    log(`${environment} git initialised`, 'success');
    process.chdir(`..`);
  } catch (e) {
    log('Could not initialise Git', 'error');
    throw new Error(`could not initialise git, ${e}`);
  }
};

// install dependencies for selected environment
const installDependencies = async (appName, environment) => {
  try {
    log(`Installing ${environment}`, 'working');

    process.chdir(
      `${
        environment === 'frontend'
          ? `${appName}_client`
          : `${appName}_${environment}`
      }`
    );
    await shell.exec(`npm i`);

    log(`${environment} installed`, 'success');
    process.chdir(`..`);
  } catch (e) {
    log(`Error while loading the dependencies`, 'error');
    throw new Error();
  }
};
// generate function of entire app folder structure
async function buildFullStackApp(appName) {
  const requiredDep = ['git', 'npm', 'npx'];

  requiredDep.forEach((dep) => {
    shell.which(dep);
    if (!shell.which(dep)) {
      log(`Sorry, this script requires ${dep}`, 'error');
      shell.exit(1);
    }
  });

  const types = ['common', 'backend'];
  let answers = null;
  try {
    shell.mkdir(`${appName}`);
    log('Root folder created', 'success');
    await createDirectories(appName);

    answers = await userForms(appName);
    log('Configuration info completed', 'success');

    log('Files generation in progress', 'working');

    types.forEach((type) =>
      require(`../../modules/${type}/common/config.json`).forEach((file) => {
        createFile(
          answers,
          file,
          ['modules', type, 'common', 'templates'],
          type
        );
      })
    );
    // frontend generation
    await generateFrontend(appName);

    // frontend update files

    log('Files generation completed', 'success');
  } catch (e) {
    log('Error creating the directory', 'error');
    throw new Error(e);
  }

  //install frontend git and dependencies
  try {
    log('npm install Frontend?', 'attention');
    await inquirer.prompt(installFrontForm).then(async (ans) => {
      if (ans.install) {
        await installDependencies(appName, 'frontend');
      } else {
        log(`Skipping frontend installation`, 'warning');
      }
    });
  } catch (e) {
    log(`Error installing frontend`, 'error');
    throw new Error(e);
  }
  //install backend git and dependencies
  try {
    log('Git and install info required - Backend', 'attention');
    await inquirer.prompt(installBackForm).then(async (ans) => {
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
    log('Error while installing the backend', 'error');
    throw new Error(e);
  }
  // install storybook if required
  if (answers.frontend.storybook) {
    try {
      process.chdir(`${appName}_client`);
      log('Storybook set up in progress', 'working');
      await new Promise((resolve, reject) => {
        shell.exec(
          `npx sb init`, function (
            error
          ) {
          if (error) {
            console.log('exec error: ' + error);
            // Reject if there is an error:
            return reject(error);
          }
          // Otherwise resolve the promise:
          resolve();
        });
      });

      log('Storybook initialised', 'success');
      log('run storybook using "npm run storybook" in client root folder','info');
      process.chdir(`..`);
    } catch (e) {
      log('Error initialising storybook', 'error');
      throw new Error(e);
    }
  }
  log('🚀🚀🚀 Set up completed!! 🚀🚀🚀', 'finish');
}

module.exports = buildFullStackApp;
