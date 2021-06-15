const {
  formatCategories,
  formatUsers,
  formatReviews,
  formatComments,
  createReviewRef
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

describe('formatReviews', () => {
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
  });
});

describe('createReviewRef', () => {
  it('returns an object when passed an array', () => {
    expect(typeof createReviewRef([])).toEqual('object');
    expect(createReviewRef([])).toEqual({});
  });
  it('returns an object with a review title as a key and review id as value when passed single instance', () => {
    const reviewInput = [
      {
        review_id: 24,
        title: 'Escape The Dark Sector',
        review_body: 'a',
        designer: 'Alex Crispin,',
        review_img_url: 'b',
        votes: 11,
        category: 'push-your-luck',
        owner: 'jessjelly',
        created_at: '2021-01-18T10:09:05.610Z'
      }
    ];
    const actual = createReviewRef(reviewInput);
    expect(actual).toEqual({ 'Escape The Dark Sector': 24 });
  });
  it("returns an object with passed in reviews' title as key and id as value, when passed multiple instances", () => {
    const input = [
      {
        review_id: 23,
        title: 'Escape The Dark Castle',
        review_body: 'd',
        designer: 'Alex Crispin,',
        review_img_url: 'c',
        votes: 18,
        category: 'push-your-luck',
        owner: 'jessjelly',
        created_at: '2021-01-18T10:09:05.410Z'
      },
      {
        review_id: 24,
        title: 'Escape The Dark Sector',
        review_body: 'b',
        designer: 'Alex Crispin,',
        review_img_url: 'a',
        votes: 11,
        category: 'push-your-luck',
        owner: 'jessjelly',
        created_at: '2021-01-18T10:09:05.610Z'
      }
    ];
    const actual = createReviewRef(input);
    const expected = {
      'Escape The Dark Sector': 24,
      'Escape The Dark Castle': 23
    };
    expect(actual).toEqual(expected);
  });
  it("doesn't mutate input data", () => {
    const input = [
      {
        review_id: 24,
        title: 'Escape The Dark Sector',
        review_body: 'a',
        designer: 'Alex Crispin,',
        review_img_url: 'b',
        votes: 11,
        category: 'push-your-luck',
        owner: 'jessjelly',
        created_at: '2021-01-18T10:09:05.610Z'
      }
    ];
    const actual = createReviewRef(input);
    const unmutatedInput = [
      {
        review_id: 24,
        title: 'Escape The Dark Sector',
        review_body: 'a',
        designer: 'Alex Crispin,',
        review_img_url: 'b',
        votes: 11,
        category: 'push-your-luck',
        owner: 'jessjelly',
        created_at: '2021-01-18T10:09:05.610Z'
      }
    ];
    expect(input).toEqual(unmutatedInput);
  });
});

describe('formatComments', () => {
  it('returns an empty array for no comments', () => {
    expect(formatComments([])).toEqual([]);
  });
  it('each comment is replaced with author, review_id, votes, created_at, body', () => {
    const input = [
      {
        body: 'I loved this game too!',
        belongs_to: 'JengARRGGGH!',
        created_by: 'bainesface',
        votes: 16,
        created_at: new Date(1511354613389)
      },
      {
        body: 'My dog loved this game too!',
        belongs_to: 'Culture a Love of Agriculture With Agricola',
        created_by: 'mallionaire',
        votes: 13,
        created_at: new Date(1610964545410)
      }
    ];
    const reviewRef = {
      'Culture a Love of Agriculture With Agricola': 1,
      'JengARRGGGH!': 2
    };
    const actual = formatComments(input, reviewRef);
    expect(actual).toEqual([
      ['bainesface', 2, 16, new Date(1511354613389), 'I loved this game too!'],
      [
        'mallionaire',
        1,
        13,
        new Date(1610964545410),
        'My dog loved this game too!'
      ]
    ]);
  });
  it('input comments are not mutated', () => {
    const input = [
      {
        body: 'I loved this game too!',
        belongs_to: 'JengARRGGGH!',
        created_by: 'bainesface',
        votes: 16,
        created_at: new Date(1511354613389)
      },
      {
        body: 'My dog loved this game too!',
        belongs_to: 'Culture a Love of Agriculture With Agricola',
        created_by: 'mallionaire',
        votes: 13,
        created_at: new Date(1610964545410)
      }
    ];
    const reviewRef = {
      'Culture a Love of Agriculture With Agricola': 1,
      'JengARRGGGH!': 2
    };
    formatComments(input, reviewRef);
    const unmutatedInput = [
      {
        body: 'I loved this game too!',
        belongs_to: 'JengARRGGGH!',
        created_by: 'bainesface',
        votes: 16,
        created_at: new Date(1511354613389)
      },
      {
        body: 'My dog loved this game too!',
        belongs_to: 'Culture a Love of Agriculture With Agricola',
        created_by: 'mallionaire',
        votes: 13,
        created_at: new Date(1610964545410)
      }
    ];
    expect(input).toEqual(unmutatedInput);
  });
});
