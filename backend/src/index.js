require('dotenv').config();

require('./database'); // Init database
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
