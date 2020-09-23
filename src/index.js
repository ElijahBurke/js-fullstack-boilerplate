/* eslint-disable no-unused-vars */
const inquirer = require('inquirer');
// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const configForm = require('./forms/index.form');
const frontendForm = require('./forms/frontend.form');
const backendForm = require('./forms/backend.form');

async function generateFullStackApp() {
  // eslint-disable-next-line no-unused-vars
  let config = {
    frontend: {},
    backend: {},
    config: {}
  };

  const configAnswers = await inquirer.prompt(configForm);
  config.config = configAnswers;
  const frontendAnswers = await inquirer.prompt(frontendForm);
  config.frontend = frontendAnswers;
  const backendAnswers = await inquirer.prompt(backendForm);
  config.backend = backendAnswers;
  
}

module.exports = generateFullStackApp;
