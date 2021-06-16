const db = require('../db/connection');

exports.selectReviewById = async (review_id) => {
  const review = await db.query(`SELECT * FROM reviews WHERE review_id = $1;`, [
    review_id
  ]);
  if (review.rows.length === 0) {
    return Promise.reject({ status: 404, msg: 'not found' });
  }
  return review.rows[0];
};
