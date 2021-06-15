const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

// make these tests async, look at your notes! Please focus, you're gonna do great if you put your mind to it <3

describe.only('/api', () => {
  describe('GET /api', () => {});
});

describe('/api/categories', () => {
  describe('GET /api/categories', () => {
    //GET AN ARRAY OF CATEGORY OBJECTS WITH SLUG AND DESCRIPTION
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
