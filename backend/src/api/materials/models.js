const Joi = require('joi');

const materialId = Joi.number().integer().positive();

const materialCreate = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().max(65535).allow('', null), // max database TEXT length
  stock: Joi.number().integer().min(0).default(1),
  state: Joi.string().equal('good', 'damaged', 'retired').default('good'),
  type: Joi.string().equal('item', 'tool').default('item'),
  locationId: Joi.number().integer().positive().required(),
}).required();

const materialUpdate = Joi.object({
  name: Joi.string().max(255),
  description: Joi.string().max(65535).allow('', null), // max database TEXT length
  stock: Joi.number().integer().min(0),
  state: Joi.string().equal('good', 'damaged', 'retired'),
  type: Joi.string().equal('item', 'tool'),
  location_id: Joi.number().integer().positive(),
})
  .rename('locationId', 'location_id')
  .required()
  .min(1); // require at least one object

module.exports = {
  materialId,
  materialCreate,
  materialUpdate,
};
