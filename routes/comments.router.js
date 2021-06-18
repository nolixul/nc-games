const express = require('express');
const commentsRouter = express.Router({ mergeParams: true });
const {
  getCommentsByReviewId,
  postComment
} = require('../controllers/comments.controllers');

commentsRouter.get('/', getCommentsByReviewId);

commentsRouter.post('/', postComment);

module.exports = commentsRouter;
