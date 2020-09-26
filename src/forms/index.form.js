// Package.json population options

module.exports = [
  {
    name: 'app_name',
    message: 'Input Application name (frontend and backend)',
    default: 'js-fullstack-app',
  },
  {
    name: 'version',
    message: 'Version: ',
    default: '1.0.0',
  },
  {
    name: 'description_frontend',
    message: 'Frontend Description:',
  },
  {
    name: 'description_backend',
    message: 'Backend Description:',
  },
  {
    name: 'author',
    message: 'Author: ',
  },
  {
    type: 'list',
    name: 'license',
    message: 'License: ',
    choices: ['ISC', 'MIT', 'UNLICENSED'],
  },
  {
    type: 'confirm',
    name: 'private',
    message: 'Private: ',
    default: true,
  },
];
