exports.createCategoryRef = (categoryData) => {};

exports.createUserRef = () => {};

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

exports.formatComments = (commentData) => {
  return commentData.map(({}) => {
    return [];
  });
};
