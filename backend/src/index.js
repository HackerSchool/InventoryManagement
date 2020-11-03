require('dotenv').config();

const express = require('express');
const knex = require('./database');
const app = express();

const port = process.env.PORT || 5000;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
