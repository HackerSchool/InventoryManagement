const controller = require('./controller');

module.exports = {
  findAll: async (req, res) => {
    if (!req.user?.hasPermission('admin')) {
      res.sendStatus(401);
      return;
    }

    res.json(await controller.findAll(req.db));
  },
};
