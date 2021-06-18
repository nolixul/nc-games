const db = require('../db/connection');
const format = require('pg-format');

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
