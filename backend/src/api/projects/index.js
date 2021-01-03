const { findAll, findOne, create, remove, update } = require('./routes');
const { asyncHandler } = require('../../middleware/error');

module.exports = {
  // Add routes to express 'app'
  init: (app) => {
    app.get('/projects', asyncHandler(findAll));
    app.get('/project/:id', asyncHandler(findOne));
    app.post('/project', asyncHandler(create));
    app.delete('/project/:id', asyncHandler(remove));
    app.post('/project/:id', asyncHandler(update));
  },
};