const express = require('express');
const commentsRouter = express.Router({ mergeParams: true });
const {
  getCommentsByReviewId,
  postComment
} = require('../controllers/comments.controllers');

commentsRouter.route('/').get(getCommentsByReviewId).post(postComment);

module.exports = commentsRouter;
