const db = require('../db/connection');

exports.selectReviewById = async (review_id) => {
  const review = await db.query(`SELECT * FROM reviews WHERE review_id = $1;`, [
    review_id
  ]);
  return review.rows[0];
};
