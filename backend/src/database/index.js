const path = require('path');
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
  },
});

knex.migrate
  .latest({ directory: path.join(__dirname, 'migrations') })
  .then(() => console.log('Executed migrations'));

module.exports = knex;
