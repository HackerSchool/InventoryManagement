const auth = require('./auth');
const locations = require('./locations');
const materials = require('./materials');
const members = require('./members');

module.exports = {
  // Add all routes to express 'app'
  init: (app) => {
    auth.init(app);
    locations.init(app);
    materials.init(app);
    members.init(app);
  },
};
