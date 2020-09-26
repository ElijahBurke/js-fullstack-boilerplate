const Mustache = require('mustache');
const { resolve, dirname } = require('path');
const fs = require('fs'); // Or `import fs from "fs";` with ESM
const shell = require('shelljs');
// const { readFileSync, writeFileSync, copySync } = require('fs-extra');
const { log } = require('./logger');

const tool = dirname(require.main.filename);

// getting the mock template
const readFile = (path) => {
  try {
    return fs.readFileSync(path, 'utf-8');
  } catch (e) {
    console.log(e);
    return false;
  }
};
// templating engine
const fromTemplate = (path, values) => Mustache.render(readFile(path), values);

// file creation
const createFile = (options, file, path, type) => {
  const toolNew = tool.replace('bin', 'src');
  const from = resolve(toolNew, ...path, file.name);
  let to = resolve(...file.path);

  if (type !== 'common') {
    to = resolve(`${options.app_name}_${type}`, ...file.path);
  }

  if (type === 'frontend') {
    to = resolve(`${options.app_name}_client`, ...file.path);
    console.log(to);
    // check the styling system
    if (options.frontend.style_system === 'styled-components') {
      options.frontend.styled = true;
    } else if (options.frontend.style_system === 'sass') {
      options.frontend.scss = true;
    } else if (options.frontend.style_system === 'less') {
      options.frontend.less = true;
    } else if (options.frontend.style_system === 'css') {
      options.frontend.css = true;
    }

    //check which state management type is selected
    if (options.frontend.state_management === 'react-redux') {
      options.frontend.redux = true;
    } else if (options.frontend.state_management === 'react-query') {
      options.frontend.query = true;
    } else if (options.frontend.state_management === 'mobx') {
      options.frontend.mobx = true;
    }
  }

  if (type === 'backend') {
    //check which backend framework is selected
    if (options.backend.backend_type === 'express') {
      options.backend.express = true;
    } else if (options.backend.backend_type === 'koa') {
      options.backend.koa = true;
    }
    //check which database type is selected
    if (options.backend.database === 'mongoDB') {
      options.backend.mongoDB = true;
    } else if (options.backend.database === 'postgreSQL') {
      options.backend.postgreSQL = true;
    }
  }

  try {
    if (!fs.existsSync(to)) {
      shell.mkdir('-p', to);
    }

    log(`Writing ${file.file_name}`, 'working');
    log(`Directory: ${to}`, 'info');

    if (file.template) {
      fs.writeFileSync(`${to}/${file.file_name}`, fromTemplate(from, options));
    } else {
      fs.copyFileSync(from, `${to}/${file.file_name}`);
    }
    log(`Written ${file.file_name} successfully`, 'success');
    log('');
  } catch (e) {
    log(`Unable to write file ${file.file_name}`, 'error');
    throw new Error(`Unable to write file ${file.file_name}, ${e}`);
  }
};

module.exports = createFile;
