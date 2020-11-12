const knex = require('knex')(require('../../knexfile'));

const knexMiddleware = (req, _res, next) => {
  req.db = knex;
  next();
};

module.exports = {
  knexMiddleware,
};
