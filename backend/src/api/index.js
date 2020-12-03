const auth = require('./auth');
const locations = require('./locations');
const members = require('./members');
const materials = require('./materials');

module.exports = {
  // Add all routes to express 'app'
  init: (app) => {
    auth.init(app);
    locations.init(app);
    members.init(app);
    materials.init(app);
  },
};
