const inquirer = require('inquirer');
const shell = require('shelljs');
const process = require('process');

const commonForm = require('../../forms/index.form');
const frontendForm = require('../../forms/frontend.form');
const backendForm = require('../../forms/backend.form');
const installFrontForm = require('../../forms/install.frontend.form');
const installBackForm = require('../../forms/install.backend.form');
const fileEditor = require('../tools/fileEditor');
const createFile = require('../tools/fileWriter');
const optionsFormatter = require('../tools/formatOptions');

const { log } = require('../tools/logger');
const formatOptions = require('../tools/formatOptions');

// install and git init
const initGitFiles = async (appName, environment) => {
  try {
    log(`Initialising git for ${environment}`, 'working');
    process.chdir(
      `${environment === 'frontend'
        ? `${appName}_client`
        : `${appName}_${environment}`
      }`
    );
    await shell.exec(`git init`);
    log(`${environment} git initialised`, 'success');
    process.chdir(`..`);
  } catch (e) {
    log('Could not initialise Git', 'error');
    throw new Error(`could not initialise git, ${e}`);
  }
};

const installDependencies = async (appName, environment) => {
  try {
    log(`Installing ${environment}`, 'working');
    process.chdir(
      `${environment === 'frontend'
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

const installAndGit = async (appName, environment) => {
  try {
    if (environment === 'frontend') {
      log('npm install Frontend?', 'attention');
      await inquirer.prompt(installFrontForm).then(async (ans) => {
        if (ans.install) {
          await installDependencies(appName, 'frontend');
        } else {
          log(`Skipping frontend installation`, 'warning');
        }
      });
    } else if (environment === 'backend') {
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
    }
  } catch (e) {
    log(`Error installing ${environment}`, 'error');
    throw new Error(e);
  }
}
//add required dependencies

const addDependencies = async (appName, options) => {
  try {
    await fileEditor(appName, options);
  } catch (e) {
    log('Error writing dependencies in frontend', 'error');
    throw new Error(e);
  }
}

//init Storybook 
const initStorybook = async (appName) => {
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
    log('run storybook using "npm run storybook" in client root folder', 'info');
    process.chdir(`..`);
  } catch (e) {
    log('Error initialising storybook', 'error');
    throw new Error(e);
  }
}

// write files in directories

const writeNewFiles = async (options) => {
  const types = ['common', 'backend', 'frontend'];
  try {
    await types.forEach((type) =>
      require(`../../modules/${type}/common/config.json`).forEach(async (file) => {
        await createFile(
          options,
          file,
          ['modules', type, 'common', 'templates'],
          type
        );
      })
    );
  } catch (e) {
    log('Error writing files', 'error');
    throw new Error(e)
  }
}

// generate frontend

const generateFrontend = async (appName) => {
  log('Initialising frontend', 'working');

  await new Promise((resolve, reject) => {
    shell.exec(
      `npx create-react-app ${appName}_client --template js-fullstack-app-frontend`, function (error) {
        if (error) {
          console.log('exec error: ' + error);
          return reject(error);
        }
        resolve();
      });
  });

  log('Frontend initialised correctly', 'success');
  log('');
};

// run forms

const userForms = async (appName) => {
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

    const formattedOptions = await optionsFormatter(options);
    console.log('newOptions', formattedOptions)
    return formattedOptions;

  } catch (e) {
    log('Error while running the configuration forms', 'error');
    throw new Error(e);
  }
}

//create root

const createDirectories = async (appName) => {
  try {
    process.chdir(`${appName}`);
    await shell.exec(`mkdir ${appName}_backend config`);
  } catch (e) {
    log(`Error Generating ${appName} directory`, 'error');
    throw new Error(e);
  }
};

//entry point to start writing the files
async function buildFullStackApp(appName) {

  //check presence of dependencies

  const requiredDep = ['git', 'npm', 'npx'];

  requiredDep.forEach((dep) => {
    shell.which(dep);
    if (!shell.which(dep)) {
      log(`Sorry, this script requires ${dep}`, 'error');
      shell.exit(1);
    }
  });

  let answers = null;

  try {
    shell.mkdir(`${appName}`);
    log('Root folder created', 'success');
  } catch (e) {
    log(`${e}`, 'error');
    throw new Error(e);
  }

  await createDirectories(appName);

  // get app requirements

  answers = await userForms(appName);

  log('Configuration info completed', 'success');

  //generate the frontend

  await generateFrontend(appName);

  // write files in common backend and frontend

  log('Files generation in progress', 'working');

  await writeNewFiles(answers);

  // install extra dependencies depending on options
  await addDependencies(appName, answers.frontend);
  log('Files generation completed', 'success');

  try {
    process.chdir(`${appName}_client/src`);
    await new Promise((resolve, reject) => {
      shell.exec(`mkdir components containers utils`, function (error) {
        if (error) {
          console.log('exec error: ' + error);
          return reject(error);
        }
        resolve();
      });
    });
    process.chdir(`../..`);
  } catch (e) {
    log('Error creating directories in Frontend src')
  }
  // initiate storybook if needed
  if (answers.frontend.storybook) {
    await initStorybook(appName);
  }

  // git and install
  await installAndGit(appName, 'frontend');
  await installAndGit(appName, 'backend');

  log('🚀🚀🚀 Set up completed!! 🚀🚀🚀', 'finish');
};

module.exports = buildFullStackApp;