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
      id = await models.requisitionId.validateAsync(req.params.id);
    } catch (e) {
      return res.sendStatus(400); // invalid ID format
    }

    const requisition = await controller.findOne(req.db, id);

    // If requisition doesn't exist, return 404
    if (!requisition) return res.sendStatus(404);

    // Only allow to see self requisitions if they aren't admins
    if (req.user.id != requisition.member.id && !req.user.hasPermission('admin'))
      return res.sendStatus(401);

    res.json(requisition);
  },

  findSelf: async (req, res) => {
    if (!req.user?.hasPermission('user')) return res.sendStatus(401);

    res.json(await controller.findSelf(req.db, req.user.id));
  },

  create: async (req, res) => {
    if (!req.user?.hasPermission('user')) return res.sendStatus(401);

    let data;
    try {
      data = await models.requisitionCreate.validateAsync(req.body, { stripUnknown: true });
    } catch (e) {
      return res.sendStatus(400);
    }

    const requisition = await controller.create(req.db, { ...data, state: 'pending' });

    // Key constraints failed
    if (!requisition) return res.sendStatus(400);

    res.json(requisition);
  },

  update: async (req, res) => {
    if (!req.user?.hasPermission('user')) return res.sendStatus(401);

    let id, data;
    try {
      [id, data] = await Promise.all([
        models.requisitionId.validateAsync(req.params.id),
        models.requisitionUpdate.validateAsync(req.body, { stripUnknown: true }),
      ]);
    } catch (e) {
      return res.sendStatus(400); // invalid ID or requisition object format
    }

    const requisition = await controller.update(
      req.db,
      id,
      data,
      !!req.user?.hasPermission('admin'),
      req.user?.id
    );

    // update controller returns null if provided requisition does not exist
    // returns false if user has no permission
    if (!requisition)
      return res.sendStatus(requisition === null ? 400 : requisition === false ? 401 : 404);
    res.json(requisition);
  },
};
