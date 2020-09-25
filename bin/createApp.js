#!/usr/bin/env node

const generateApp = require('../src/index');

// eslint-disable-next-line no-undef
const args = process.argv.splice(process.execArgv.length + 2);

let mergeArgs = '';

if (args.length > 0) {
  mergeArgs = args.map((arg) => arg.toLowerCase()).join('_');
} else {
  mergeArgs = 'fullstack_app_js';
}

generateApp.buildFullStackApp(mergeArgs);