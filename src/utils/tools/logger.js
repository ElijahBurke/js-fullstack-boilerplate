const chalk = require('chalk');

module.exports.highlight = (message, expression = '') => message
  .replace(expression, chalk.bold.whiteBright(expression));

module.exports.log = (message = '', status = null) => {
  let icon = '';
  let spaces = ' ';
  let content = '';

  switch (status) {
    case 'finish':
      content = chalk.green(message);
      break;
    case 'success':
      icon = '✅';
      content = chalk.green(message);
      break;
    case 'attention':
      icon = '⚡';
      content = chalk.red(message);
      break;
    case 'warning':
      icon = '⚠️';
      spaces = '  ';
      content = chalk.yellow(message);
      break;
    case 'error':
      icon = '❌';
      content = chalk.red(message);
      break;
    case 'info':
      icon = '❕';
      content = chalk.white.bold(message);
      break;
    case 'working':
      icon = '⚙️';
      spaces = '  ';
      content = chalk.cyan(message);
      break;
    default:
      icon = '';
      spaces = '';
      content = message;
      break;
  }

  console.log(`${icon}${spaces}${content}`);
};