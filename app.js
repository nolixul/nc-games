const express = require('express');
const {
  handle500Errors,
  handlePSQLErrors,
  handleCustomErrors,
  send404
} = require('./controllers/errors.controllers');

const apiRouter = require('./routes/api.router');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use(send404);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);

app.use(handle500Errors);

module.exports = app;
