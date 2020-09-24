const Mustache = require('mustache');
const { resolve, dirname } = require('path');

const { readFileSync, writeFileSync, copyFileSync } = require('fs');

const tool = dirname(require.main.filename);

const readFile = (path) => {
  try {
    return readFileSync(path, 'utf-8');
  } catch (e) {
    console.log(e);
    return false;
  }
}

const fromTemplate = (path, values) => Mustache.render(readFile(path), values);

const createFile = (options, file, path, type) => {
  const toolNew = tool.replace('bin', 'src');
  const from = resolve(toolNew, ...path, file.name)
  const to = resolve(...file.path, file.file_name);

  if (file.template) {
    let passedOptions = options;
    if (file.file_name !== 'configFSApp.json') {
      passedOptions = options[type];
    }
    writeFileSync(to, fromTemplate(from, passedOptions), (error) => {
      if (error) {
        console.log(`cannot write file, ${error}`);
      }
    });
  } else {
    copyFileSync(from, to);
  }
}

module.exports = createFile;
