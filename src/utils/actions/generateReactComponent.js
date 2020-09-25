const shell = require('shelljs');
const fs = require('fs');
const { log } = require('../tools/logger');

const generateReactComponent = (type, name) => {
  log(`this will generate a ${type}, named ${name}`, 'info')
}


module.exports = generateReactComponent;