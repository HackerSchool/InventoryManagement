const { findAll, findOne, create, remove, update } = require('./routes');
const { asyncHandler } = require('../../middleware/error');

module.exports = {
  // Add routes to express 'app'
  init: (app) => {
    app.get('/locations', asyncHandler(findAll));
    app.get('/location/:id', asyncHandler(findOne));
    app.post('/location', asyncHandler(create));
    app.delete('/location/:id', asyncHandler(remove));
    app.post('/location/:id', asyncHandler(update));
  },
};
