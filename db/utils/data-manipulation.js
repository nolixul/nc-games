exports.formatCategories = (categoryData) => {
  return categoryData.map(({ slug, description }) => {
    return [slug, description];
  });
};

exports.formatUsers = (userData) => {
  return userData.map(({ username, avatar_url, name }) => {
    return [username, avatar_url, name];
  });
};

exports.formatReviews = (reviewData) => {
  return reviewData.map(
    ({
      title,
      review_body,
      designer,
      review_img_url = 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      votes,
      category,
      owner,
      created_at
    }) => {
      return [
        title,
        review_body,
        designer,
        review_img_url,
        votes,
        category,
        owner,
        created_at
      ];
    }
  );
};

exports.createReviewRef = (reviewRows) => {
  const reviewRef = {};
  reviewRows.forEach((review) => {
    reviewRef[review.title] = review.review_id;
  });
  return reviewRef;
};

exports.formatComments = (commentData, reviewRef) => {
  return commentData.map(
    ({
      created_by,
      votes = 0,
      created_at,
      belongs_to,
      body = 'no comment'
    }) => {
      const author = created_by;
      const review_id = reviewRef[belongs_to];
      const toReturn = [author, review_id, votes, created_at, body];
      return toReturn;
    }
  );
};
