const db = require('../db/connection');
const format = require('pg-format');

exports.selectReviewById = async (review_id) => {
  const review = await db.query(
    `SELECT reviews.*, COUNT(*) AS comment_count 
    FROM reviews 
    LEFT JOIN comments ON reviews.review_id = comments.review_id WHERE reviews.review_id = $1
    GROUP BY reviews.review_id;`,
    [review_id]
  );
  if (review.rows.length === 0) {
    return Promise.reject({ status: 404, msg: 'not found' });
  }
  return review.rows[0];
};

exports.updateReviewById = async (review_id, inc_votes) => {
  const updatedReview = await db.query(
    `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`,
    [inc_votes, review_id]
  );
  if (updatedReview.rows.length === 0) {
    return Promise.reject({ status: 404, msg: 'not found' });
  }
  return updatedReview.rows[0];
};
