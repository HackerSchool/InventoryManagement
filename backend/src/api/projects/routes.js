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
      id = await models.projectId.validateAsync(req.params.id);
    } catch (e) {
      return res.sendStatus(400); // invalid ID format
    }

    const project = await controller.findOne(req.db, id);

    // If project doesn't exist, return 404
    if (!project) return res.sendStatus(404);
    res.json(project);
  },

  create: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let data;
    try {
      data = await models.projectCreate.validateAsync(req.body, { stripUnknown: true });
    } catch (e) {
      return res.sendStatus(400); // invalid project object
    }

    res.json(await controller.create(req.db, data));
  },

  remove: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let id;
    try {
      id = await models.projectId.validateAsync(req.params.id);
    } catch (e) {
      return res.sendStatus(400); // invalid ID format
    }

    const success = await controller.remove(req.db, id);
    // Return forbidden if project has requisitions linked to it
    if (!success) return res.sendStatus(success === null ? 403 : 404);
    res.sendStatus(204);
  },

  update: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let id, data;
    try {
      [id, data] = await Promise.all([
        models.projectId.validateAsync(req.params.id),
        models.projectUpdate.validateAsync(req.body, { stripUnknown: true }),
      ]);
    } catch (e) {
      return res.sendStatus(400); // invalid ID or project object format
    }

    const project = await controller.update(req.db, id, data);

    if (!project) return res.sendStatus(404);
    res.json(project);
  },

  addMember: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let memberId, projectId;
    try {
      memberId = await models.memberId.validateAsync(req.params.memberId);
      projectId = await models.projectId.validateAsync(req.params.projectId);
    } catch (e) {
      return res.sendStatus(400); // invalid object
    }

    res.json(await controller.addMember(req.db, memberId, projectId));
  },

  removeMember: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let memberId, projectId;
    try {
      memberId = await models.memberId.validateAsync(req.params.memberId);
      projectId = await models.projectId.validateAsync(req.params.projectId);
    } catch (e) {
      return res.sendStatus(400); // invalid object
    }

    res.json(await controller.addMember(req.db, projectId, memberId));
  },
};
