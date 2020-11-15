require('dotenv').config();

const express = require('express');

const { authenticateJWT } = require('./middleware/authentication');
const { knexMiddleware } = require('./middleware/database'); // Init database
const { errorHandler } = require('./middleware/error');

const api = require('./api');

const app = express();

const port = process.env.PORT || 5000;

app.use(knexMiddleware);
app.use(authenticateJWT);

// Initiate all API routes
api.init(app);

// Handler any non-handled errors
app.use(errorHandler);

// TODO remove after implementing other routes
app.get('/hello', (req, res) => {
  //res.status(400);
  res.send('HELLOOO :)');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
