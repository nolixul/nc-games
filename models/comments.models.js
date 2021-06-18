const db = require('../db/connection');

exports.selectCommentsByReviewId = async (review_id) => {
  const commentsByReview = await db.query(
    `SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body FROM comments
 WHERE comments.review_id = $1;`,
    [review_id]
  );
  if (commentsByReview.rows.length === 0) {
    const isItAReview = await db.query(
      `SELECT * FROM reviews WHERE reviews.review_id = $1`,
      [review_id]
    );
    if (isItAReview.rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'not found' });
    }
  }
  return commentsByReview.rows;
};

exports.insertComment = async (username, body, review_id) => {
  if (!username || !body) {
    return Promise.reject({ status: 400, msg: 'bad request' });
  }
  const comment = await db.query(
    `INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING *;`,
    [username, body, review_id]
  );
  return comment.rows[0];
};
