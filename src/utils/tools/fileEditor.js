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

  // push necessary packages
  if (options.style_system === 'styled-components') {
    currentDependencies["styled-components"] = "^5.2.0";
  } else if (options.style_system === 'sass') {
    currentDependencies["node-sass"] = "^4.14.1";
  }
  if (options.state_management === 'react-redux') {
    currentDependencies["react-redux"] = "^7.2.1";
  } else if (options.state_management === 'react-query') {
    currentDependencies["react-query"] = "^2.23.0";
  } else if (options.state_management === 'mobx') {
    currentDependencies["mobx"] = "^5.15.7";
  }

  if (options.routing) {
    currentDependencies["react-router"] = "^5.2.0";
    currentDependencies["react-router-dom"] = "^5.2.0";
  }

  if (options.helmet) {
    currentDependencies["react-helmet"] = "^6.1.0";
  }

  if (options.documentation) {
    currentDependencies["docz"] = "^2.3.1";
    packageJSONData["resolutions"] = { "webpack": "4.42.0" };
    currentScripts["docz:dev"] = "docz dev";
    currentScripts["docz:build"] = "docz build";
    currentScripts["docz:serve"] = "docz build && docz serve";
  }

  // update file object
  packageJSONData.dependencies = currentDependencies;
  packageJSONData.scripts = currentScripts;

  const dataToFile = JSON.stringify(packageJSONData);
  //remove old package.json
  try {
    fs.unlinkSync(from)
  } catch (e) { 
    log('Error updating package.json', 'error');
  }

  //add new package.json

  try {
    fs.writeFileSync(from,  dataToFile) 
  } catch (e) {
    log(`Unable to write file package.json`, 'error');
    throw new Error(`Unable to write file package.json, ${e}`);
  }

}
module.exports = fileEditor;