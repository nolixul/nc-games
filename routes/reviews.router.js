const express = require('express');
const {
  getReviewById,
  patchReviewById
} = require('../controllers/reviews.controllers');
const reviewsRouter = express.Router();

reviewsRouter.get('/:review_id', getReviewById);

reviewsRouter.patch('/:review_id', patchReviewById);

module.exports = reviewsRouter;
