const express = require('express');
const { getReviews } = require('../controllers/reviews.controllers');
const reviewIdRouter = require('./reviewId.router');
const reviewsRouter = express.Router({ mergeParams: true });

reviewsRouter.use('/:review_id', reviewIdRouter);

reviewsRouter.get('/', getReviews);

module.exports = reviewsRouter;
