const express = require('express');
const { getReviewById } = require('../controllers/reviews.controllers');
const reviewsRouter = express.Router();

reviewsRouter.get('/:review_id', getReviewById);

module.exports = reviewsRouter;
