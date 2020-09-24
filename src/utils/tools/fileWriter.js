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

  const toolNew = tool.replace('bin', 'src');

  const from = resolve(toolNew, ...path, file.name)
  let to = resolve(...file.path, file.file_name);

  if (type !== 'common') {
    to = resolve(...file.path, `${options.app_name}_${type}`,file.file_name);
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
}

module.exports = createFile;
