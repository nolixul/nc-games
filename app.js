const express = require('express');
const { handle500Errors } = require('./controllers/errors.controllers');

const apiRouter = require('./routes/api.router');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use(handle500Errors);

module.exports = app;
