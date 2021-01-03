const { findAll, findOne, findSelf } = require('./routes');
const { asyncHandler } = require('../../middleware/error');

module.exports = {
  // Add routes to express 'app'
  init: (app) => {
    app.get('/requisitions', asyncHandler(findAll));
    app.get('/requisition/:id', asyncHandler(findOne));
    app.get('/requisitions/self', asyncHandler(findSelf));
  },
};
