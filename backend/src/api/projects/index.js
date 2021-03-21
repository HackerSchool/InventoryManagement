const {
  findAll,
  findOne,
  create,
  remove,
  update,
  addMember,
  removeMember,
  findOneMember,
} = require('./routes');
const { asyncHandler } = require('../../middleware/error');

module.exports = {
  // Add routes to express 'app'
  init: (app) => {
    app.get('/projects', asyncHandler(findAll));
    app.get('/project/:id', asyncHandler(findOne));
    app.post('/project', asyncHandler(create));
    app.delete('/project/:id', asyncHandler(remove));
    app.post('/project/:id', asyncHandler(update));
    app.post('/project/:projectId/member/:memberId', asyncHandler(addMember));
    app.delete('/project/:projectId/member/:memberId', asyncHandler(removeMember));
    app.get('/project/:projectId/member/:memberId', asyncHandler(findOneMember));
  },
};
