const controller = require('./controller');
const models = require('./models');

module.exports = {
  findAll: async (req, res) => {
    if (!req.user?.hasPermission('user')) return res.sendStatus(401);

    res.json(await controller.findAll(req.db));
  },

  findOne: async (req, res) => {
    if (!req.user?.hasPermission('user')) return res.sendStatus(401);

    let id;
    try {
      id = await models.locationId.validateAsync(req.params.id);
    } catch (e) {
      return res.sendStatus(400); // invalid ID format
    }

    const location = await controller.findOne(req.db, id);

    // If location doesn't exist, return 404
    if (!location) return res.sendStatus(404);
    res.json(location);
  },

  create: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let data;
    try {
      data = await models.locationCreate.validateAsync(req.body);
    } catch (e) {
      return res.sendStatus(400); // invalid location object
    }

    res.json(await controller.create(req.db, data));
  },

  remove: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let id;
    try {
      id = await models.locationId.validateAsync(req.params.id);
    } catch (e) {
      return res.sendStatus(400); // invalid ID format
    }

    const success = await controller.remove(req.db, id);

    if (!success) return res.sendStatus(404);
    res.sendStatus(204);
  },

  update: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let id, data;
    try {
      [id, data] = await Promise.all([
        models.locationId.validateAsync(req.params.id),
        models.locationUpdate.validateAsync(req.body),
      ]);
    } catch (e) {
      return res.sendStatus(400); // invalid ID or location object format
    }

    const location = await controller.update(req.db, id, data);

    if (!location) return res.sendStatus(404);
    res.json(location);
  },
};
