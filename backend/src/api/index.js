const auth = require('./auth');
const users = require('./members');

module.exports = {
  // Add all routes to express 'app'
  init: (app) => {
    auth.init(app);
    users.init(app);
  },
};
