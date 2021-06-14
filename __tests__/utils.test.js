const {
  formatCategories,
  formatUsers,
  formatReviews,
  createCategoryRef
} = require('../db/utils/data-manipulation');

describe('formatCategories', () => {
  it('returns an empty array for no categories', () => {
    expect(formatCategories([])).toEqual([]);
  });
  it('each category is replaced with [slug, description]', () => {
    const input = [
      {
        slug: 'euro game',
        description: 'Abstact games that involve little luck'
      }
    ];
    const actual = formatCategories(input);
    expect(actual).toEqual([
      ['euro game', 'Abstact games that involve little luck']
    ]);
  });
  it("doesn't mutate input array", () => {
    const input = [
      {
        slug: 'euro game',
        description: 'Abstact games that involve little luck'
      }
    ];
    formatCategories(input);
    const unmutatedInput = [
      {
        slug: 'euro game',
        description: 'Abstact games that involve little luck'
      }
    ];
    expect(input).toEqual(unmutatedInput);
  });
});

describe('formatUsers', () => {
  it('returns an empty array for no users', () => {
    expect(formatUsers([])).toEqual([]);
  });
  it('each user is replaced with [username, avatar_url, name]', () => {
    const input = [
      {
        username: 'mallionaire',
        name: 'haz',
        avatar_url:
          'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
      }
    ];
    const actual = formatUsers(input);
    expect(actual).toEqual([
      [
        'mallionaire',
        'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
        'haz'
      ]
    ]);
  });
  it("doesn't mutate input array", () => {
    const input = [
      {
        username: 'mallionaire',
        name: 'haz',
        avatar_url:
          'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
      }
    ];
    formatUsers(input);
    const unmutatedInput = [
      {
        username: 'mallionaire',
        name: 'haz',
        avatar_url:
          'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
      }
    ];
    expect(input).toEqual(unmutatedInput);
  });
});

//describe('userRef (username)');

// NEED TO WRITE REF DICTIONARIES FOR COMMENTS TABLES AND TEST THEM. ALSO NEED TO SET DEFAULT IMAGE URL TO DEFAULT IN CREATE TABLE

describe.only('formatReviews', () => {
  it('returns an empty array for no categories', () => {
    expect(formatReviews([])).toEqual([]);
  });
  it('each review is replaced with [title, review_body, designer, review_img_url, votes, category, owner, created_at]', () => {
    const input = [
      {
        title: 'Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'mallionaire',
        review_body: 'Farmyard fun!',
        category: 'euro game',
        created_at: new Date(1610964020514),
        votes: 1,
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png'
      }
    ];
    const actual = formatReviews(input);
    expect(actual).toEqual([
      [
        'Agricola',
        'Farmyard fun!',
        'Uwe Rosenberg',
        'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
        1,
        'euro game',
        'mallionaire',
        new Date(1610964020514)
      ]
    ]);
  });
  it("doesn't mutate input array", () => {
    const input = [
      {
        title: 'Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'mallionaire',
        review_body: 'Farmyard fun!',
        category: 'euro game',
        created_at: new Date(1610964020514),
        votes: 1,
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png'
      }
    ];
    formatReviews(input);
    const unmutatedInput = [
      {
        title: 'Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'mallionaire',
        review_body: 'Farmyard fun!',
        category: 'euro game',
        created_at: new Date(1610964020514),
        votes: 1,
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png'
      }
    ];
    expect(input).toEqual(unmutatedInput);
    //TEST FOR MULTIPLE INSTANCES
    //TEST FOR REFERENCE
    //CAN TEST FOR THE OBJECT REFERENCES INSIDE THE ARRAYS - WHEN MANIPULATING THE DATA
  });
});

//describe('reviewRef (review_id)');
