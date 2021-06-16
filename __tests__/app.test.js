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

// make these tests async, look at your notes! Please focus, you're gonna do great if you put your mind to it <3

describe('/api', () => {
  describe('GET /api', () => {});
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
  describe('GET /api/reviews', () => {});
  describe.only('/api/reviews/:review_id', () => {
    it('GET /api/reviews/:review_id', async () => {
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
        created_at: '2021-01-18T10:00:20.514Z'
      });
    });
    it('PATCH /api/reviews/:review_id', () => {});
    it('GET /api/reviews/:review_id/comments', () => {});
    it('POST /api/reviews/:review_id/comments', () => {});
  });
});

// THESE ARE ESSENTIAL ENDPOINT TEST FRAMEWORKS
