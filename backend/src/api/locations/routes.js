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
    // TODO
  },

  create: async (req, res) => {
    // TODO
  },

  remove: async (req, res) => {
    const { id } = req.params;
    // TODO
  },

  update: async (req, res) => {
    const { id } = req.params;
    // TODO
  },
};
