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
exports.selectReviews = async (
  sort_by = 'created_at',
  order = 'desc',
  category
) => {
  const validColumns = [
    'owner',
    'title',
    'review_id',
    'category',
    'review_img_url',
    'created_at',
    'votes',
    'comment_count'
  ];

  if (!validColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: 'bad request' });
  }

  if (order !== 'asc' && order !== 'desc') {
    return Promise.reject({ status: 400, msg: 'bad request' });
  }

  let queryValues = [];

  let queryStr = `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, COUNT(*) AS comment_count 
  FROM reviews 
  LEFT JOIN comments 
  ON reviews.review_id = comments.review_id `;
  if (category) {
    queryStr += `WHERE reviews.category = $1 `;
    queryValues.push(category);
  }
  queryStr += `GROUP BY reviews.review_id ORDER BY ${sort_by} ${order};`;

  const reviews = await db.query(queryStr, queryValues);

  if (reviews.rows.length === 0) {
    if (category) {
      const categoryResults = await db.query(
        `SELECT * FROM categories WHERE categories.slug = $1`,
        [category]
      );
      if (categoryResults.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'not found' });
      }
    }
  }
  return reviews.rows;
};
