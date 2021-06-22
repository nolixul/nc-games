const express = require('express');
const {
  getReviews,
  getReviewById,
  patchReviewById
} = require('../controllers/reviews.controllers');
const commentsRouter = require('./comments.router');
const reviewsRouter = express.Router({ mergeParams: true });

reviewsRouter.use('/:review_id/comments', commentsRouter);

reviewsRouter.get('/', getReviews);

reviewsRouter.route('/:review_id').get(getReviewById).patch(patchReviewById);

module.exports = reviewsRouter;
