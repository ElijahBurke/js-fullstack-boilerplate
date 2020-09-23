// Frontend form for app set up.

// version 1: react only

// Style-management

// State-management

// Testing for now single option, will be multi-option

// Routing

// React Helmet

// Storybook

// Documentation

export default [
  {
    type: 'list',
    name: 'style-system',
    message: 'Select styling option: ',
    choices: ['None', 'Styled-components', 'Sass', 'Less', 'css'],
  },
  {
    type: 'list',
    name: 'stateManagement',
    message: 'Select State Management Method: ',
    choices: ['React-redux', 'React-Query', 'React Context API'],
  },
  {
    type: 'confirm',
    name: 'routing',
    message: 'Would you like to use Routing (Y/n)?',
    default: 'yes'
  },
  {
    type: 'confirm',
    name: 'helmet',
    message: 'Would you like to use React-helmet (Y/n)?',
    default: 'yes'
  },
  {
    type: 'list',
    name: 'testing',
    message: 'Testing Library?',
    choices: ['Jest', 'Mocha', 'Cypress']
  },
  {
    type: 'confirm',
    name: 'storybook',
    message: 'Would you like to use Storybook (Y/n)?',
    default: 'yes'
  },
  {
    type: 'confirm',
    name: 'documentation',
    message: 'Create App Documentation with Docz (Y/n)?',
    default: 'yes'
  }
];