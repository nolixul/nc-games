exports.getEndpoints = async (req, res, next) => {
  const endpoints = [
    {
      '/api':
        'GET - gets a list of available endpoints and the methods you can use on them'
    },
    { '/api/reviews': 'GET - gets all the reviews in the database' },
    { '/api/reviews/:review_id': 'GET - gets a specific review by review id' },
    {
      '/api/reviews/:review_id':
        'PATCH - increase or decreased the votes on a specific review, accepts {inc_votes: number} eg. {inc_votes: 5} would increase votes by 5'
    },
    {
      '/api/reviews/:review_id/comments':
        'GET - gets all comments on a specific review'
    },
    {
      '/api/reviews/:review_id/comments':
        'POST - posts a new comment for a specific review, accepts {username: "example_username", body: "comment body"}'
    },
    { '/api/categories': 'gets all categories from the database' }
  ];

  res.send({ endpoints });
};
