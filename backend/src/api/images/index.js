const { findAll, findBuffer, findOne } = require('./routes');
const { asyncHandler } = require('../../middleware/error');

module.exports = {
  // Add routes to express 'app'
  init: (app) => {
    app.get('/images', asyncHandler(findAll));
    app.get('/image/:id', asyncHandler(findOne));
    app.get('/image/src/:id', asyncHandler(findBuffer));
  },
};
