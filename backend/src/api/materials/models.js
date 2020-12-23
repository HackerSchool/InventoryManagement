const Joi = require('joi');

const materialsQuery = Joi.object({
  _q: Joi.string(),
  _sort: Joi.string().regex(/^(?:name|stock|value):(?:asc|desc)$/),
  _limit: Joi.number().positive(),
  _start: Joi.number().min(0),
  state: Joi.string(),
  type: Joi.string(),
}).default({});

const materialId = Joi.number().integer().positive();

const materialCreate = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().max(65535).allow('', null), // max database TEXT length
  stock: Joi.number().integer().min(0).default(1),
  state: Joi.string().equal('good', 'damaged', 'retired').default('good'),
  type: Joi.string().equal('item', 'tool', 'other').default('item'),
  value: Joi.number().max(0).precision(2),
  location_id: Joi.number().integer().positive().required(),
})
  .rename('locationId', 'location_id')
  .required();

const materialUpdate = Joi.object({
  name: Joi.string().max(255),
  description: Joi.string().max(65535).allow('', null), // max database TEXT length
  stock: Joi.number().integer().min(0),
  state: Joi.string().equal('good', 'damaged', 'retired'),
  type: Joi.string().equal('item', 'tool', 'other'),
  value: Joi.number().max(0).precision(2),
  location_id: Joi.number().integer().positive(),
})
  .rename('locationId', 'location_id')
  .required()
  .min(1); // require at least one object

module.exports = {
  materialsQuery,
  materialId,
  materialCreate,
  materialUpdate,
};
