const express = require('express');
const apiRouter = express.Router();

const categoriesRouter = require('./categories.router');
const reviewsRouter = require('./reviews.router');

const { getEndpoints } = require('../controllers/api.controllers');

apiRouter.use('/categories', categoriesRouter);

apiRouter.use('/reviews', reviewsRouter);

apiRouter.get('/', getEndpoints);

module.exports = apiRouter;
