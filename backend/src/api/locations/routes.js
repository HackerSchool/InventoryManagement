const controller = require('./controller');

module.exports = {
  findAll: async (req, res) => {
    if (!req.user?.hasPermission('user')) return res.sendStatus(401);

    res.json(await controller.findAll(req.db));
  },

  findOne: async (req, res) => {
    if (!req.user?.hasPermission('user')) return res.sendStatus(401);

    const { id } = req.params;
    const location = await controller.findOne(req.db, id);
    if (!location) return res.sendStatus(404);
    res.json(location);
  },

  create: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);
    const data = req.body;
    res.json(await controller.create(req.db, data));
  },

  remove: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    const { id } = req.params;
    const affectedRows = await controller.delete(req.db, id);
    if (affectedRows === 0) return res.sendStatus(404);
    res.sendStatus(204);
  },

  update: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    const { id } = req.params;
    const location = await controller.update(req.db, id, req.body);
    if (!location) return res.sendStatus(404);
    res.json(location);
  },
};
