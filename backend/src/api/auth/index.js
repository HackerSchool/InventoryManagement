const { fenixLogin, userProfile } = require('./routes');
const { asyncHandler } = require('../../middleware/error');

module.exports = {
  // Add routes to express 'app'
  init: (app) => {
    app.get('/auth/fenix', asyncHandler(fenixLogin));
    app.get('/auth/profile', asyncHandler(userProfile));
  },
};
