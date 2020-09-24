const Mustache = require('mustache');
const { resolve, dirname } = require('path');

const { readFileSync, writeFileSync, copyFileSync } = require('fs');

const tool = dirname(require.main.filename);

// getting the mock template
const readFile = (path) => {
  try {
    return readFileSync(path, 'utf-8');
  } catch (e) {
    console.log(e);
    return false;
  }
}
// templating engine 
const fromTemplate = (path, values) => Mustache.render(readFile(path), values);

// file creation
const createFile = (options, file, path, type) => {
  try {
    const toolNew = tool.replace('bin', 'src');
    const from = resolve(toolNew, ...path, file.name)
    let to = resolve(...file.path, file.file_name);
  
    if (type !== 'common') {
      to = resolve(...file.path, `${options.app_name}_${type}`,file.file_name);
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

    if (file.template) {
      writeFileSync(to, fromTemplate(from, options), (error) => {
        if (error) {
          console.log(`cannot write file, ${error}`);
        }
      });
    } else {
      copyFileSync(from, to);
    }

  } catch (e) {
    throw new Error(`Unable to write file ${file.file_name}, ${e}`);
  }
}

module.exports = createFile;
