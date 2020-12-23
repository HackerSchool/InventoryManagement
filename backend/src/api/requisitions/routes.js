const { resolveConfig } = require('prettier');
const controller = require('./controller');
const models = require('./models');

module.exports = {
  findAll: async (req, res) => {
    if (!req.user?.hasPermission('admin')) {
      res.sendStatus(401);
      return;
    }

    res.json(await controller.findAll(req.db));
  },

  findOne: async (req, res) => {
    if (!req.user?.hasPermission('user')) return res.sendStatus(401);

    let id;
    try {
      id = await models.requisitionId.validateAsync(req.params.id);
    } catch (e) {
      return res.sendStatus(400); // invalid ID format
    }

    const requisition = await controller.findOne(req.db, id);

    // If location doesn't exist, return 404
    if (!requisition) return res.sendStatus(404);
    if (req.user.id != requisition.member.id && !req.user.hasPermission('admim'))
      return res.sendStatus(401);
    res.json(requisition);
  },

  findSelf: async (req, res) => {
    if (!req.user?.hasPermission('admin')) {
      res.sendStatus(401);
      return;
    }

    res.json(await controller.findSelf(req.db, req.user.id));
  },
};
