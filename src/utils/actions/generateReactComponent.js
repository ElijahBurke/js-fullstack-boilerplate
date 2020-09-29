const path = require('path');
const fs = require('fs');
const { log } = require('../tools/logger');
const process = require('process');
const { resolve } = require('path');
const fileWriter = require('../tools/fileWriter');
const filesPrep = require('../../modules/frontend/config.json');
// create directory and add files

const writeNewFiles = async (files, options) => {
  try {
    files.forEach((file) => {
      fileWriter(options, file, ['modules', 'frontend', 'templates']);
    });
  } catch (e) {
    log('Error writing files', 'error');
    return;
  }
};

const createNewComponent = async (itemType, config) => {
  const requiredFiles = [];

  for (let spec in config.frontend) {
    if (config.frontend[spec]) {
      filesPrep.forEach((file) => {
        if (file.type === spec) {
          file.path = [`${config.frontend.path}`];
          file.react = config.frontend.itemType;
          requiredFiles.push(file);
        }
      });
    }
  }

  const entry = filesPrep.find((file) => file.type === 'entry');
  entry.path = [`${config.frontend.path}`];
  entry.react = config.frontend.itemType;
  requiredFiles.push(entry);

  await writeNewFiles(requiredFiles, config);
};

// checking the directory
const checkDirectory = (path, requiredType) => {
  const directories = path.split('/');
  try {
    if (directories.includes('src')) {
      if (directories.includes('components')) {
        if (requiredType === 'container') {
          throw new Error('Containers not allowed in Components folder');
        } else {
          log('Correct directory', 'success');
        }
      } else if (directories.includes('containers')) {
        if (
          requiredType === 'component' &&
          directories.indexOf('containers') === directories.length - 1
        ) {
          throw new Error(
            'Component can not be created in the root containers folder, only inside an existing container'
          );
        } else {
          log('Correct directory', 'success');
        }
      }
    } else {
      throw new Error('Outside src directory, generation not allowed');
    }
  } catch (e) {
    log(e, 'error');
    return false;
  }
};
//getting the config file

const checkConfigFile = async (directoryPath) => {
  //check whether its the right directory => src => components only for components

  const pathArray = directoryPath.split('/');
  const indexSrc = pathArray.indexOf('src');
  const pathToRoot = pathArray.slice(0, indexSrc - 1).join('/');

  //passsing directoryPath and callback function
  try {
    return fs.readFileSync(
      resolve(pathToRoot, 'config/configFSApp.json'),
      'utf-8'
    );
  } catch (e) {
    log('Error reading config file', 'error');
    return false;
  }
};

const generateReactComponent = async (type, name) => {
  //check directory
  const directoryPath = path.join(process.cwd(), '');
  // check the location
  const hasError = checkDirectory(directoryPath, type);
  // get config file
  if (hasError !== false) {
    const configData = await checkConfigFile(directoryPath, type);
    const configParsed = configData && JSON.parse(configData);
    //create and update directory
    configParsed.frontend.path = configParsed && name;
    const copyName = name;
    configParsed.frontend.itemName =
      copyName[0].toUpperCase() + copyName.substring(1);
    configParsed.frontend.component = type === 'component' ? true : false;
    //generate new directory
    if (configParsed) await createNewComponent(type, configParsed);
  }
};

module.exports = generateReactComponent;
