const express = require('express');

const { errorControllers } = require('./controllers/');

const apiRouter = require('./routes/');

const app = express();

app.use(express.json());

module.exports = app;
