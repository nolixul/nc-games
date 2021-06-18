const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const app = require('../app');
const request = require('supertest');

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  return db.end();
});

describe('/', () => {
  it('404: non existent route', async () => {
    const { body } = await request(app).get('/notaroute').expect(404);
    expect(body.msg).toBe('not found');
  });
});

describe('/api', () => {
  describe('GET /api', () => {
    it('200: responds with JSON describing available endpoints in the api', async () => {
      const { body } = await request(app).get('/api').expect(200);
      expect(body.endpoints).toHaveLength(6);
      endpoints.forEach((endpoint) => {
        expect(endpoint).toEqual(
          expect.objectContaining({
            path: expect.any(String),
            description: expect.any(String)
          })
        );
      });
    });
  });
});

describe('/api/categories', () => {
  describe('GET /api/categories', () => {
    it('200: responds with an array of categories', async () => {
      const { body } = await request(app).get('/api/categories').expect(200);
      body.categories.forEach((category) => {
        expect(category).toEqual(
          expect.objectContaining({
            slug: expect.any(String),
            description: expect.any(String)
          })
        );
      });
    });
  });
});

describe('/api/reviews', () => {
  describe('GET /api/reviews', () => {
    it('200: returns an array of review objects', async () => {
      const { body } = await request(app).get('/api/reviews').expect(200);
      body.reviews.forEach((review) => {
        expect.objectContaining({
          owner: expect.any(String),
          title: expect.any(String),
          review_id: expect.any(Number),
          category: expect.any(String),
          review_img_url: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(String)
        });

        expect(review.hasOwnProperty('designer', 'review_body')).toBe(false);
      });

      expect(body.reviews).toHaveLength(13);
    });
    it('200: default sort_by is by date column', async () => {
      const { body } = await request(app).get('/api/reviews').expect(200);
      const reviews = body.reviews;
      expect(reviews[0].review_id).toBe(7);
      expect(reviews[reviews.length - 1].review_id).toBe(13);
      expect(reviews).toBeSortedBy('created_at', {
        descending: true
      });
    });
    it('200: accepts sort_by query which sorts reviews by any valid column', async () => {
      const { body } = await request(app)
        .get('/api/reviews?sort_by=owner')
        .expect(200);
      const reviews = body.reviews;
      expect(reviews).toBeSortedBy('owner', { coerce: true, descending: true });
    });
    it('200: default order is descending', async () => {
      const { body } = await request(app)
        .get('/api/reviews?sort_by=review_id')
        .expect(200);
      const reviews = body.reviews;
      expect(reviews).toBeSortedBy('review_id', {
        descending: true
      });
    });
    it('200: accepts order query which can be set to asc or desc', async () => {
      const { body } = await request(app)
        .get('/api/reviews?sort_by=review_id&order=asc')
        .expect(200);
      const reviews = body.reviews;
      expect(reviews).toBeSortedBy('review_id');
    });
    it('200: accepts category query which filters the reviews by category', async () => {
      const { body } = await request(app)
        .get('/api/reviews?category=social deduction')
        .expect(200);
      expect(body.reviews).toHaveLength(11);
      body.reviews.forEach((review) => {
        expect(review.category).toBe('social deduction');
      });
    });
    it("404: responds with not found if category doesn't exist", async () => {
      const { body } = await request(app)
        .get('/api/reviews?category=not a category')
        .expect(404);
      expect(body.msg).toBe('not found');
    });
    it('400: responds with bad request if sort_by is invalid', async () => {
      const { body } = await request(app)
        .get('/api/reviews?sort_by=45')
        .expect(400);
      expect(body.msg).toBe('bad request');
    });
    it('400: responds with bad request if order query is not valid', async () => {
      const { body } = await request(app)
        .get('/api/reviews?order=nice_try')
        .expect(400);
      expect(body.msg).toBe('bad request');
    });
  });
});

describe('/api/reviews/:review_id', () => {
  describe('GET /api/reviews/:review_id', () => {
    it('200: returns review that matches review_id', async () => {
      const { body } = await request(app).get('/api/reviews/1').expect(200);
      expect(body.review).toEqual({
        review_id: 1,
        title: 'Agricola',
        review_body: 'Farmyard fun!',
        designer: 'Uwe Rosenberg',
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
        votes: 1,
        category: 'euro game',
        owner: 'mallionaire',
        created_at: '2021-01-18T10:00:20.514Z',
        comment_count: '1'
      });
    });
    it('404: responds with error if review_id does not exist', async () => {
      const { body } = await request(app).get('/api/reviews/40000').expect(404);
      expect(body.msg).toBe('not found');
    });
    it('400: responds with bad request if review_id is invalid format', async () => {
      const { body } = await request(app)
        .get('/api/reviews/nice_try')
        .expect(400);
      expect(body.msg).toBe('bad request');
    });
  });
  describe('PATCH /api/reviews/:review_id', () => {
    it('200: responds with updated review', async () => {
      const { body } = await request(app)
        .patch('/api/reviews/1')
        .send({ inc_votes: 100 })
        .expect(200);

      expect(body.review).toEqual({
        review_id: 1,
        title: 'Agricola',
        review_body: 'Farmyard fun!',
        designer: 'Uwe Rosenberg',
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
        votes: 101,
        category: 'euro game',
        owner: 'mallionaire',
        created_at: '2021-01-18T10:00:20.514Z'
      });
      let response = await request(app)
        .patch('/api/reviews/1')
        .send({ inc_votes: -31 })
        .expect(200);

      expect(response.body.review).toEqual({
        review_id: 1,
        title: 'Agricola',
        review_body: 'Farmyard fun!',
        designer: 'Uwe Rosenberg',
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
        votes: 70,
        category: 'euro game',
        owner: 'mallionaire',
        created_at: '2021-01-18T10:00:20.514Z'
      });
      response = await request(app)
        .patch('/api/reviews/1')
        .send({ inc_votes: 0 })
        .expect(200);

      expect(response.body.review).toEqual({
        review_id: 1,
        title: 'Agricola',
        review_body: 'Farmyard fun!',
        designer: 'Uwe Rosenberg',
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
        votes: 70,
        category: 'euro game',
        owner: 'mallionaire',
        created_at: '2021-01-18T10:00:20.514Z'
      });
    });
    it('404: responds with error if review_id does not exist', async () => {
      const { body } = await request(app)
        .patch('/api/reviews/40000')
        .send({ inc_votes: 0 })
        .expect(404);
      expect(body.msg).toBe('not found');
    });
    it('400: responds with bad request if review_id is invalid format', async () => {
      const { body } = await request(app)
        .patch('/api/reviews/nice_try')
        .send({ inc_votes: 0 })
        .expect(400);
      expect(body.msg).toBe('bad request');
    });
    it('400: responds with bad request if update data is invalid', async () => {
      const { body } = await request(app)
        .patch('/api/reviews/1')
        .send({ blah: 'notANumber!' })
        .expect(400);
      expect(body.msg).toBe('bad request');
    });
  });
});

describe('/api/reviews/:review_id/comments', () => {
  describe('GET /api/reviews/:review_id/comments', () => {
    it('200: responds with an array of comments for the review', async () => {
      const { body } = await request(app)
        .get('/api/reviews/2/comments')
        .expect(200);
      expect(body.comments).toHaveLength(3);
      body.comments.forEach((comment) => {
        expect.objectContaining({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: expect.any(String),
          body: expect.any(String)
        });
        expect(comment.hasOwnProperty('review_id')).toBe(false);
      });
    });
    it('200: responds with empty array if there are no comments for that review', async () => {
      const { body } = await request(app)
        .get('/api/reviews/1/comments')
        .expect(200);
      expect(body.comments).toEqual([]);
    });
    it('404: responds with not found if review_id does not exist', async () => {
      const { body } = await request(app)
        .get('/api/reviews/40000/comments')
        .expect(404);
      expect(body.msg).toEqual('not found');
    });
  });
  describe('POST /api/reviews/:review_id/comments', () => {
    it('201: responds with newly created comment', async () => {
      const { body } = await request(app)
        .post('/api/reviews/1/comments')
        .send({
          username: 'mallionaire',
          body: 'Best thing invented since sliced bread'
        })
        .expect(201);
      expect(
        body.comment.hasOwnProperty(
          'comment_id',
          'votes',
          'created_at',
          'author',
          'body'
        )
      ).toBe(true);
      expect(body.comment.author).toEqual('mallionaire');
      expect(body.comment.body).toEqual(
        'Best thing invented since sliced bread'
      );
      expect(body.comment.review_id).toBe(1);
    });
    it('400: responds with bad request if object passed in does not have correct keys', async () => {
      const { body } = await request(app)
        .post('/api/reviews/1/comments')
        .send({ not_a_column: 9 })
        .expect(400);
      expect(body.msg).toBe('bad request');
    });
  });
});
