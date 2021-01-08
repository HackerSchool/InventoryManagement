const auth = require('./auth');
const images = require('./images');
const locations = require('./locations');
const materials = require('./materials');
const members = require('./members');
const projects = require('./projects');
const requisitions = require('./requisitions');

module.exports = {
  // Add all routes to express 'app'
  init: (app) => {
    auth.init(app);
    images.init(app);
    locations.init(app);
    materials.init(app);
    members.init(app);
    projects.init(app);
    requisitions.init(app);
  },
};
