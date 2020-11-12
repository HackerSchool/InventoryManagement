const users = require('./members');

module.exports = {
  // Add all routes to express 'app'
  init: (app) => {
    users.init(app);
  },
};
