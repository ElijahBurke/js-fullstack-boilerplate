const path = require('path');
const fs = require('fs');
const { log } = require('../tools/logger');
const process = require('process');
const { resolve } = require('path');
const fileWriter = require('../tools/fileWriter');
const filesPrep = require('../../modules/frontend/config.json')
// create directory and add files

const createNewComponent = async (itemType, path, config) => {
  console.log(itemType, path, config);
  const requiredFiles = [];
  
  await fileWriter(
    null, 
    null,
    ['modules', 'frontend', 'templates'],

  );
}

// checking the directory
const checkDirectory = (path, requiredType) => {
  const directories = path.split('/');
  try {
    if (directories.includes('src')) {
      if (directories.includes('components')) {
        if (requiredType === 'container') {
          log('Containers not allowed in Components folder', 'error');
          throw new Error('Containers not allowed in Components folder');
        } else {
          log('Correct directory', 'success');
          return true;
        }
      } else if (directories.includes('containers') && directories.indexOf('containers') !== directories.length - 1) {
        log('Correct directory', 'success');
        return true;
      } else {
        log('Component can not be created in the root containers forlder, only inside an existing container', 'error');
        throw new Error('Wrong location for component creation');
      }
    } else {
      log('Outside src directory, creation not allowed', 'error');
      throw new Error('Outside src directory, creation not allowed');
    }
  } catch (e) {
    log('Something went wrong, check your directories and try again', 'error');
    throw new Error(e);
  }
}
//getting the config file

const checkConfigFile = async (directoryPath) => {
  //check whether its the right directory => src => components only for components

  const pathArray = directoryPath.split('/')
  const indexSrc = pathArray.indexOf('src')
  const pathToRoot = pathArray.slice(0, indexSrc - 1).join('/');

  //passsing directoryPath and callback function
  try {
    return fs.readFileSync(resolve(pathToRoot, 'config/configFSApp.json'), 'utf-8');
  } catch (e) {
    log('Error reading config file', 'error');
    throw new Error(e);
  }
}

const generateReactComponent = async (type, name) => {
  //check name

  //check directory
  const directoryPath = path.join(process.cwd(), '');
  // check the location
  try {
    await checkDirectory(directoryPath);
  } catch (e) {
    log('Something went wrong checking the directory', 'error');
    throw new Error(e);
  }
  // get config file
  const configData = await checkConfigFile(directoryPath, type);
  const configParsed = configData && JSON.parse(configData);
  //create and update directory
  configParsed.frontend.path = name;
  //generate new directory
  try {
    createNewComponent(type, directoryPath, configParsed.frontend);
  } catch (e) {
    log('Error creating new item in project', 'error');
  }

};

module.exports = generateReactComponent;
