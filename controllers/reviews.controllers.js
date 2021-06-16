const { selectReviewById } = require('../models/reviews.models');

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((review) => {
      console.log(review, 'RETURN REVIEW');
      res.send({ review });
    })
    .catch((err) => {
      next(err);
    });
};
