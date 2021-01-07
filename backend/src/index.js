require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

process.env.ROOT_PATH = path.join(__dirname, '..');

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

// Handle static files (in production might be handled by reverse proxy)
app.use('/static', express.static(path.join(process.env.ROOT_PATH, 'static')));

// Handler any non-handled errors
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
