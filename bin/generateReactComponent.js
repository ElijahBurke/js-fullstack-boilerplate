#!/usr/bin/env node

const generateApp = require('../src/index');

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

// eslint-disable-next-line no-undef
const args = process.argv.splice(process.execArgv.length + 2);

let name = null;
let type = null;
if (args.length > 0 && (args[0] === 'component' || args[0] === 'container')) {
  type = args[0];
  if (args.length > 1) {
    const nameArgs = args.slice(1);
    name = nameArgs.map((arg) => arg.toLowerCase()).join(' ');
    name = camelize(camelize(name));
  } else {
    name = '' + type + ' ' + Math.random().toString(36).substr(2, 5) + '';
    name = camelize(name);
  }

  generateApp.generateReactComponent(type, name);
} else {
  throw new Error('React Component type required, use container/component');
}
