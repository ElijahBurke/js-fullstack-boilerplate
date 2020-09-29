const { resolve } = require('path');
const fs = require('fs');
const { log } = require('./logger');
const process = require('process');

// getting the mock template
const readFile = (path) => {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf-8').toString());
  } catch (e) {
    log('Error reading package.json', 'error');
    return false;
  }
};

//entry point
const fileEditor = (appName, options) => {
  const appPath = process.cwd();
  const from = resolve(appPath, `${appName}_client`, 'package.json');

  //get package.json data
  const packageJSONData = readFile(from);
  const currentDependencies = packageJSONData.dependencies;
  const currentScripts = packageJSONData.scripts;
  // required dependencies
  currentDependencies['@testing-library/jest-dom'] = '^5.11.4';
  currentDependencies['@testing-library/react'] = '^11.0.4';
  currentDependencies['@testing-library/user-event'] = '^12.1.4';
  currentDependencies['web-vitals'] = '^0.2.4';
  currentDependencies['prettier'] = '^2.1.2';
  currentDependencies['pretty-quick'] = '^3.0.2';
  currentDependencies['husky'] = '^4.3.0';
  currentDependencies['eslint-plugin-react'] = '^7.21.2';
  currentScripts['pre-commit'] = 'pretty-quick --staged';
  currentScripts['coverage'] = 'npm test -- --coverage --watchAll=false';
  // push necessary packages
  if (options.styled_components) {
    currentDependencies['styled-components'] = '^5.2.0';
  } else if (options.sass) {
    currentDependencies['node-sass'] = '^4.14.1';
  }
  if (options.redux) {
    currentDependencies['react-redux'] = '^7.2.1';
    currentDependencies['redux-thunk'] = '^2.3.0';
    currentDependencies['redux'] = '^4.0.5';
  } else if (options.query) {
    currentDependencies['react-query'] = '^2.23.0';
    currentDependencies['react-query-devtools'] = '^2.5.1';
  } else if (options.mobx) {
    currentDependencies['mobx'] = '^5.15.7';
  }

  if (options.routing) {
    currentDependencies['react-router'] = '^5.2.0';
    currentDependencies['react-router-dom'] = '^5.2.0';
  }

  if (options.helmet) {
    currentDependencies['react-helmet'] = '^6.1.0';
  }

  if (options.documentation) {
    currentDependencies['docz'] = '^2.3.1';
    packageJSONData['resolutions'] = { webpack: '4.42.0' };
    currentScripts['docz:dev'] = 'docz dev';
    currentScripts['docz:build'] = 'docz build';
    currentScripts['docz:serve'] = 'docz build && docz serve';
  }
  if (options.mocha) {
    currentDependencies['mocha'] = '^8.1.3';
    currentDependencies['chai'] = '^4.2.0';
    currentScripts['test'] = 'mocha';
  }
  if (options.jest) {
    currentDependencies['jest'] = '^26.4.2';
    currentDependencies['react-test-renderer'] = '^16.13.1';
    currentDependencies['enzyme'] = '^3.11.0';
    currentDependencies['enzyme-adapter-react-16'] = '^1.15.5';
    currentScripts['test'] = 'jest';
  }

  if (options.cypress) {
    currentDependencies['cypress'] = '^5.2.0';
    currentScripts['cypress'] = 'cypress open';
  }
  // update file object
  packageJSONData.dependencies = currentDependencies;
  packageJSONData.scripts = currentScripts;

  const dataToFile = JSON.stringify(packageJSONData);
  //remove old package.json
  try {
    fs.unlinkSync(from);
  } catch (e) {
    log('Error updating package.json', 'error');
  }

  //add new package.json

  try {
    fs.writeFileSync(from, dataToFile);
  } catch (e) {
    log(`Unable to write file package.json`, 'error');
    throw new Error(`Unable to write file package.json, ${e}`);
  }
};
module.exports = fileEditor;
