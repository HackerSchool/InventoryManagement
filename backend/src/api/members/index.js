const { findAll, findOne, create, remove, update } = require('./routes');
const { asyncHandler } = require('../../middleware/error');

module.exports = {
  // Add routes to express 'app'
  init: (app) => {
    app.get('/members', asyncHandler(findAll));
    app.get('/member/:id', asyncHandler(findOne));
    app.post('/member', asyncHandler(create));
    app.delete('/member/:id', asyncHandler(remove));
    app.post('/member/:id', asyncHandler(update));
  },
};
