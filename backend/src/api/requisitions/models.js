const Joi = require('joi');

const requisitionId = Joi.number().integer().positive();

const requisitionCreate = Joi.object({
  id_material: Joi.number().integer().positive().required(),
  id_member: Joi.number().integer().positive().required(),
  id_project: Joi.number().integer().positive(),
  quantity: Joi.number().integer().positive().default(1),
})
  .rename('materialId', 'id_material')
  .rename('memberId', 'id_member')
  .rename('projectId', 'id_project')
  .required();

const requisitionUpdate = Joi.object({
  id_project: Joi.number().integer().positive(),
  date_out: Joi.date(),
  date_in: Joi.date(),
})
  .rename('projectId', 'id_project')
  .rename('dateOut', 'date_out')
  .rename('dateIn', 'date_in')
  .required()
  .min(1); // require at least one object

module.exports = {
  requisitionId,
  requisitionCreate,
  requisitionUpdate,
};
