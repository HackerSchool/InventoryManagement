const Joi = require('joi');

const projectId = Joi.number().integer().positive();

const projectCreate = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().max(65535).allow('', null), // max database TEXT length
  state: Joi.string().equal('active', 'finished', 'abandoned'),
}).required();

const projectUpdate = Joi.object({
  name: Joi.string().max(255),
  description: Joi.string().max(65535).allow('', null), // max database TEXT length
  state: Joi.string().equal('active', 'finished', 'abandoned'),
})
  .required()
  .min(1); // require at least one object

module.exports = {
  projectId,
  projectCreate,
  projectUpdate,
  memberId: projectId,
};
