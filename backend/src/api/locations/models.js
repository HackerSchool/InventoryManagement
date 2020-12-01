const Joi = require('joi');

const locationId = Joi.number().integer().positive();

const locationCreate = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().max(65535).allow('', null), // max database TEXT length
}).required();

const locationUpdate = Joi.object({
  name: Joi.string().max(255),
  description: Joi.string().max(65535).allow('', null), // max database TEXT length
})
  .required()
  .min(1); // require at least one object

module.exports = {
  locationId,
  locationCreate,
  locationUpdate,
};
