const controller = require('./controller');

module.exports = {
  findAll: async (req, res) => {
    if (!req.user?.hasPermission('user')) {
      res.sendStatus(401);
      return;
    }

    res.json(await controller.findAll(req.db));
  },

  findOne: async (req, res) => {
    const { id } = req.params;
    const location = await controller.findOne(req.db, id);
    if (!location) return res.sendStatus(404);
    res.json(location);
  },

  create: async (req, res) => {},

  remove: async (req, res) => {
    const { id } = req.params;
    // TODO
  },

  update: async (req, res) => {
    const { id } = req.params;
    // TODO
  },
};
