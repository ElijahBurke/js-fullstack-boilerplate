// Package.json population options

module.exports = [
  {
    name: 'app-name',
    message: 'Input Application name (frontend and backend)',
    default: 'JS-fullStack-app'
  },
  {
    name: 'version',
    message: 'Version: ',
    default: '1.0.0'
  },
  {
    name: 'description-frontend',
    message: 'Frontend Description:'
  },
  {
    name: 'description-backend',
    message: 'Backend Description:'
  },
  {
    name: 'author',
    message: 'Author: '
  },
  {
    name: 'email',
    message: 'Email: '
  },
  {
    name: 'license',
    message: 'License (ISC): ',
    default: 'ISC'
  },
  {
    type: 'list',
    name: 'private',
    message: 'Private: ',
    choices: ['true', 'false'],
  }
];