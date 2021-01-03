const controller = require('./controller');
const models = require('./models');

module.exports = {
  findAll: async (req, res) => {
    if (!req.user?.hasPermission('user')) return res.sendStatus(401);

    let query;
    try {
      query = await models.materialsQuery.validateAsync(req.query, { stripUnknown: true });
    } catch (e) {
      return res.sendStatus(400); // invalid query format
    }

    let { _q, _sort, _start, _limit, state, type } = query;

    res.json(
      await controller.findAll(req.db, {
        query: _q,
        sort: _sort,
        limit: _limit,
        offset: _start,
        state: state,
        type: type,
      })
    );
  },

  countAll: async (req, res) => {
    if (!req.user?.hasPermission('user')) return res.sendStatus(401);

    let query;
    try {
      query = await models.materialsQuery.validateAsync(req.query, { stripUnknown: true });
    } catch (e) {
      return res.sendStatus(400); // invalid query format
    }

    let { _q, state, type } = query;

    res.json({
      count: await controller.countAll(req.db, {
        query: _q,
        state: state,
        type: type,
      }),
    });
  },

  findOne: async (req, res) => {
    if (!req.user?.hasPermission('user')) return res.sendStatus(401);

    let id;
    try {
      id = await models.materialId.validateAsync(req.params.id);
    } catch (e) {
      return res.sendStatus(400); // invalid ID format
    }

    const material = await controller.findOne(req.db, id);

    // If material doesn't exist, return 404
    if (!material) return res.sendStatus(404);
    res.json(material);
  },

  create: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let data;
    try {
      data = await models.materialCreate.validateAsync(req.body, { stripUnknown: true });
    } catch (e) {
      return res.sendStatus(400); // invalid material object
    }

    const material = await controller.create(req.db, data);

    // Return 404 if location does not exist.
    if (!material) return res.sendStatus(400);
    res.json(material);
  },

  remove: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let id;
    try {
      id = await models.materialId.validateAsync(req.params.id);
    } catch (e) {
      return res.sendStatus(400); // invalid ID format
    }

    const success = await controller.remove(req.db, id);
    // Return forbidden if material has requisitions linked to it
    if (!success) return res.sendStatus(success === null ? 403 : 404);
    res.sendStatus(204);
  },

  update: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let id, data;
    try {
      [id, data] = await Promise.all([
        models.materialId.validateAsync(req.params.id),
        models.materialUpdate.validateAsync(req.body, { stripUnknown: true }),
      ]);
    } catch (e) {
      return res.sendStatus(400); // invalid ID or material object format
    }

    const material = await controller.update(req.db, id, data);

    // update controller returns null if provided location does not exist
    if (!material) return res.sendStatus(material === null ? 400 : 404);
    res.json(material);
  },
};
