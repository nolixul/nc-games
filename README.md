# Northcoders House of Games 2021 API

## Link to Hosted Version

[Hosted Version](https://nc-games-2021.herokuapp.com/)

## Project Summary

This is an API hosted on Heroku, built for the purpose of accessing and interacting with northcoders house of games data.

PSQL has been used to build this project. There are a number of benefits to using postgreSQL, especially it being open source! PSQL allows you to scale your databases, there are ways to make your database very secure, and it's a really reliable technology to use thanks to the strong developer community around it.

As someone brand new to coding, I've run into many speed bumps during this project! The main challenge has been getting to grips with PSQL for the first time - I have found SQL quite fussy after working with JavaScript for a number of weeks.

---

### Available Endpoints

- `/api` - GET a list of available endpoints and the methods you can use on them
- `/api/reviews` - GET all the reviews in the database
- `/api/reviews/:review_id` - GET a specific review by id, PATCH - increase or decrease the votes on a specific review
- `/api/reviews/:review_id/comments` - GET comments associated with the review_id, POST a new comment on a review specified by review_id
- `/api/categories` - GET all the categories in the database

---

### Future Functionality

I would like to implement more functionality in this API in the future, planned future functionality is the following:

- DELETE `/api/comments/:comment_id`
- GET `/api/users`
- GET `/api/users/:username`
- PATCH `/api/comments/:comment_id`

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

### Node.js and Postgres Version Requirements

Minimum version of Node.js required: `v15.14.0`  
Minimum version of Postgres required: `12.7`

---
