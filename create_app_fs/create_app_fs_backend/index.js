'use strict';


const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const conf = require('./config');
const router = require('./router');

const PORT = 3001;


app.use(serve(conf.clientPath));
app.use(bodyParser());
app.use(router.routes());

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // eslint-disable-line no-console
}); 

