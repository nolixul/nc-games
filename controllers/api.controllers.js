exports.getAPI = async (req, res, next) => {
  const endpoints = {
    '/api/categories': 'GET',
    '/api/reviews/:review_id': 'GET, PATCH',
    '/api/reviews': 'GET',
    '/api/reviews/:review_id/comments': 'GET, POST',
    '/api': 'GET'
  };
  res.send({ endpoints });
};
