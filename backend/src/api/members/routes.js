const controller = require('./controller');
const models = require('./models');

module.exports = {
  findAll: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    res.json(await controller.findAll(req.db));
  },

  findOne: async (req, res) => {
    if (!req.user?.hasPermission('user')) return res.sendStatus(401);

    let id;
    try {
      id = await models.memberId.validateAsync(req.params.id);
    } catch (e) {
      return res.sendStatus(400);
    }

    const member = await controller.findOne(req.db, id);

    if (!member) return res.sendStatus(404);
    res.json(member);
  },

  create: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let data;
    try {
      data = await models.memberCreate.validateAsync(req.body, { stripUnknown: true });
    } catch (e) {
      return res.sendStatus(400);
    }

    const member = await controller.create(req.db, data);

    if (!member) return res.sendStatus(400); // Duplicate user
    res.json(member);
  },

  remove: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let id;
    try {
      id = await models.memberId.validateAsync(req.params.id);
    } catch (e) {
      return res.sendStatus(400);
    }

    const success = await controller.remove(req.db, id);
    if (!success) return res.sendStatus(success === null ? 403 : 404);
    res.sendStatus(204);
  },

  update: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let id, data;
    try {
      [id, data] = await Promise.all([
        models.memberId.validateAsync(req.params.id),
        models.memberUpdate.validateAsync(req.body, { stripUnknown: true }),
      ]);
    } catch (e) {
      return res.sendStatus(400);
    }

    const member = await controller.update(req.db, id, data);

    if (!member) return res.sendStatus(404);
    res.json(member);
  },
};
