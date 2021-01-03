const { findAll, findOne, findSelf, create, update } = require('./routes');
const { asyncHandler } = require('../../middleware/error');

module.exports = {
  // Add routes to express 'app'
  init: (app) => {
    app.get('/requisitions', asyncHandler(findAll));
    app.get('/requisition/:id', asyncHandler(findOne));
    app.get('/requisitions/self', asyncHandler(findSelf));
    app.post('/requisitions', asyncHandler(create));
    app.post('/requisition/:id', asyncHandler(update));
  },
};
