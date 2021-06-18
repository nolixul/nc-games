const express = require('express');
const reviewIdRouter = express.Router({ mergeParams: true });
const {
  getReviewById,
  patchReviewById
} = require('../controllers/reviewId.controllers');
const commentsRouter = require('./comments.router');

reviewIdRouter.use('/comments', commentsRouter);

reviewIdRouter.get('/', getReviewById);

reviewIdRouter.patch('/', patchReviewById);

module.exports = reviewIdRouter;
