const { selectReviews } = require('../models/reviews.models');

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query;
  selectReviews(sort_by, order, category)
    .then((reviews) => {
      res.send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};
