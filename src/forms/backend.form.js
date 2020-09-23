// form for backend selections

// nodeJS standard for now

// express, koa, graphql, next up Socket.io

// database type: mongo + mongoose, postregsql + sequelize 

export default [
  {
    type: 'list',
    name: 'backendType',
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