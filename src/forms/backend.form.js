// form for backend selections

// nodeJS standard for now

// express, koa, graphql, next up Socket.io

// database type: mongo + mongoose, postregsql + sequelize 

module.exports = [
  {
    type: 'list',
    name: 'backend_type',
    message: 'Select Backend Framework: ',
    choices: ['express', 'koa', 'graphQL'],
  },
  {
    type: 'list',
    name: 'database',
    message: 'Select Database Engine : ',
    choices: ['mongoDB', 'postgreSQL'],
  }
];