const Joi = require('joi');

const imageId = Joi.number().integer().positive();

module.exports = {
  imageId,
};
