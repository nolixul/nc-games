const express = require('express');
const {
  getReviewById,
  patchReviewById,
  getReviews
} = require('../controllers/reviews.controllers');
const reviewsRouter = express.Router();

reviewsRouter.get('/:review_id', getReviewById);

reviewsRouter.patch('/:review_id', patchReviewById);

reviewsRouter.get('/', getReviews);

module.exports = reviewsRouter;
