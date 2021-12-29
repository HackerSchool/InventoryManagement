require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const { authenticateJWT } = require('./middleware/authentication');
const { knexMiddleware } = require('./middleware/database'); // Init database
const { errorHandler } = require('./middleware/error');

const api = require('./api');

const app = express();

const port = process.env.PORT || 5000;

app.use(fileUpload({ limits: { fileSize: 2 * 1024 * 1024 } })); // 2 MB
app.use(knexMiddleware);
app.use(authenticateJWT);
app.use(bodyParser.json());

// Initiate all API routes
api.init(app);

// Handler any non-handled errors
app.use(errorHandler);

app.listen(port, () => {
  console.log(`HS Inventory listening at http://localhost:${port}`);
});
