const Joi = require('joi');

const memberId = Joi.number().integer().positive();

const memberCreate = Joi.object({
  name: Joi.string().max(255).required(),
  ist_id: Joi.string()
    .max(12)
    .regex(/^ist\d+$/)
    .required(),
  active: Joi.boolean().default(true),
  role: Joi.string().equal('admin', 'admin').default('user'),
})
  .rename('istId', 'ist_id')
  .required();

const memberUpdate = Joi.object({
  name: Joi.string().max(255),
  ist_id: Joi.string()
    .max(12)
    .regex(/^ist\d+$/),
  active: Joi.boolean(),
  role: Joi.string().equal('admin', 'admin'),
})
  .rename('istId', 'ist_id')
  .required()
  .min(1); // require at least one object

module.exports = {
  memberId,
  memberCreate,
  memberUpdate,
};
