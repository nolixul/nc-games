const db = require('../connection');
const pg = require('pg');
const format = require('pg-format');

const {
  formatCategories,
  formatUsers,
  formatReviews,
  formatComments
} = require('../utils/data-manipulation');

const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  const defaultURL =
    "'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg'";

  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS reviews;`);
  await db.query(`DROP TABLE IF EXISTS categories;`);
  await db.query(`DROP TABLE IF EXISTS users;`);

  await db.query(
    `CREATE TABLE categories (
      slug VARCHAR(200) NOT NULL PRIMARY KEY, 
      description VARCHAR(1000)
      );`
  );
  await db.query(`CREATE TABLE users (
    username VARCHAR(200) NOT NULL PRIMARY KEY, 
    avatar_url VARCHAR(500) NOT NULL, 
    name VARCHAR(200) NOT NULL
  );`);
  await db.query(`CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY, 
    title VARCHAR(300) NOT NULL, 
    review_body VARCHAR(1000) NOT NULL, 
    designer VARCHAR(300) NOT NULL, 
    review_img_url VARCHAR(500) NOT NULL DEFAULT ${defaultURL}, 
    votes INT NOT NULL DEFAULT 0, 
    category VARCHAR REFERENCES categories (slug), 
    owner VARCHAR REFERENCES users (username),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );`);
  await db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY, 
    author VARCHAR NOT NULL REFERENCES users, 
    review_id INT REFERENCES reviews, 
    votes INT NOT NULL DEFAULT 0, 
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );`);

  const categoryValues = formatCategories(categoryData);
  const categoryQueryStr = format(
    `INSERT INTO categories (slug, description) VALUES %L RETURNING *;`,
    categoryValues
  );
  await db.query(categoryQueryStr);

  const usersValues = formatUsers(userData);
  const usersQueryStr = format(
    `INSERT INTO users (username, avatar_url, name) VALUES %L RETURNING *;`,
    usersValues
  );
  await db.query(usersQueryStr);

  const reviewValues = formatReviews(reviewData);
  const reviewsQueryStr = format(
    `INSERT INTO reviews (
    title,
    review_body,
    designer,
    review_img_url,
    votes,
    category,
    owner,
    created_at) VALUES %L RETURNING *;`,
    reviewValues
  );
  await db.query(reviewsQueryStr);

  const commentValues = formatComments(commentData);
  const commentsQueryStr = format(
    `INSERT INTO comments (
    author VARCHAR REFERENCES users (username),
    review_id REFERENCES reviews (review_id),
    votes INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
    ) VALUES %L RETURNING *;`,
    commentValues
  );
  const commentsResult = await db.query(commentsQueryStr);
  console.log(commentsResult);

  //ASSIGN YOUR RETURNING * AWAIT TO A VARIABLE AND CONSOLE.LOG IT TO SEE SOME FEEDBACK!!
};

module.exports = seed;
