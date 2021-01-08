const { findAll, findOne } = require('./routes');
const { asyncHandler } = require('../../middleware/error');

module.exports = {
  // Add routes to express 'app'
  init: (app) => {
    app.get('/images', asyncHandler(findAll));
    app.get('/image/:id', asyncHandler(findOne));
  },
};
