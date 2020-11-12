require('dotenv').config();

const { knexMiddleware } = require('./middleware/database'); // Init database
const express = require('express');
const { authenticateJWT } = require('./middleware/authentication');

const app = express();

const port = process.env.PORT || 5000;

app.use(knexMiddleware);
app.use(authenticateJWT);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
