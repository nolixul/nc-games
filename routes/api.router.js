const express = require('express');
const apiRouter = express.Router();

const categoriesRouter = require('./categories.router');
const reviewsRouter = require('./reviews.router');

// const { apiControllers } = require('../controllers/');

module.exports = apiRouter;
