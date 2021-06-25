# Northcoders House of Games 2021 API

## Link to Hosted Version

[Hosted Version](https://nc-games-2021.herokuapp.com/api)

## Project Summary

This is an API hosted on Heroku, built for the purpose of accessing and interacting with northcoders house of games data.

PSQL has been used to build this project. There are a number of benefits to using postgreSQL, especially it being open source! PSQL allows you to scale your databases, there are ways to make your database very secure, and it's a really reliable technology to use thanks to the strong developer community around it.

As someone brand new to coding, I've run into many speed bumps during this project! The main challenge has been getting to grips with PSQL for the first time - I have found SQL quite fussy after working with JavaScript for a number of weeks.

---

### Available Endpoints

- GET `/api` - gets a list of available endpoints and the methods you can use on them
- GET `/api/reviews` - gets all the reviews in the database
- GET `/api/reviews/:review_id` - gets a specific review by review id
- PATCH `/api/reviews/:review_id` - increase or decreased the votes on a specific review, accepts {inc_votes: number} eg. {inc_votes: 5} would increase votes by 5
- GET `/api/reviews/:review_id/comments` - gets all comments on a specific review
- POST `/api/reviews/:review_id/comments` - posts a new comment for a specific review, accepts {username: "example_username", body: "comment body"}
- GET `/api/categories` - gets all categories from the database

---

### Future Functionality

I would like to implement more functionality in this API in the future, planned future functionality is the following:

- DELETE `/api/comments/:comment_id` - delete comments by comment id
- GET `/api/users` - get all users from the database
- GET `/api/users/:username` - get a single user by id
- PATCH `/api/comments/:comment_id` - update a specific comment's votes

---

## Set-up

There are a few steps to setting up this project locally.

---

### Clone

Fork the repository on gitHub, click the code button to get a download link. Use the command `git clone` in your terminal, followed by your download link.

```
git clone https://github.com/EXAMPLE-LINK
```

---

### .env

You will need to set up two `.env` files which will allow you to use a separate test database and a development database. These should be named `.env.development` and `.env.test`. They should have a single line of text inside which sets the postgres database variable to the database you want to use. See `.env.example` file for an example of how it should be set out.

`.env.test`

```
PGDATABASE=nc_games_test
```

`.env.development`

```
PGDATABASE=nc_games
```

---

### Install Dependencies

To install all dependencies, you need to run `npm i` in your terminal.

```
npm i
```

---

### Seed Local Database

A few scripts have been set up to make things easier. To seed the local database, use the command `npm run seed` in your terminal.

```
npm run seed
```

---

### Node.js and Postgres Version Requirements

Minimum version of Node.js required: `v15.14.0`  
Minimum version of Postgres required: `12.7`

---
