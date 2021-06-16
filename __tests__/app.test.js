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

describe.only('/api/categories', () => {
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
  describe('/api/reviews/:review_id', () => {
    describe('GET /api/reviews/:review_id', () => {
      // GET A REVIEW OBJECT WITH SPECIFIED ID :
      //  LOOK IN README FROM NOW ON
    });
    describe('PATCH /api/reviews/:review_id', () => {});
    describe('GET /api/reviews/:review_id/comments', () => {});
    describe('POST /api/reviews/:review_id/comments', () => {});
  });
});

// THESE ARE ESSENTIAL ENDPOINT TEST FRAMEWORKS
