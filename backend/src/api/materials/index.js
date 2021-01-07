const { findAll, countAll, findOne, create, remove, update, setImage } = require('./routes');
const { asyncHandler } = require('../../middleware/error');

module.exports = {
  // Add routes to express 'app'
  init: (app) => {
    app.get('/materials', asyncHandler(findAll));
    app.get('/materials/count', asyncHandler(countAll));
    app.get('/material/:id', asyncHandler(findOne));
    app.post('/material', asyncHandler(create));
    app.delete('/material/:id', asyncHandler(remove));
    app.post('/material/:id', asyncHandler(update));
    app.post('/material/:id/image', asyncHandler(setImage));
  },
};
