module.exports = [
  {
    type: 'list',
    name: 'backend_type',
    message: 'Select Backend Framework: ',
    default: 'express',
    choices: ['express', 'koa'],
  },
  {
    type: 'list',
    name: 'database',
    message: 'Select Database Engine : ',
    default: 'mongoDB',
    choices: ['mongoDB', 'postgreSQL'],
  },
  {
    name: 'db_name',
    message: 'Database name',
    default: '',
  },
];
