const controller = require('./controller');
const models = require('./models');

module.exports = {
  findAll: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    res.json(await controller.findAll(req.db));
  },

  findOne: async (req, res) => {
    if (!req.user?.hasPermission('admin')) return res.sendStatus(401);

    let id;
    try {
      id = await models.imageId.validateAsync(req.params.id);
    } catch (e) {
      return res.sendStatus(400); // invalid ID format
    }

    const image = await controller.findOne(req.db, id);

    // If image doesn't exist, return 404
    if (!image) return res.sendStatus(404);
    res.json(image);
  },

  findBuffer: async (req, res) => {
    let id;
    try {
      id = await models.imageId.validateAsync(req.params.id);
    } catch (e) {
      return res.sendStatus(404); // invalid ID format
    }
    const image = await controller.findBuffer(req.db, id);

    // If image doesn't exist, return 404
    if (!image) return res.sendStatus(404);
    res.set('Content-Type', 'image/webp');
    res.send(image);
  },
};
