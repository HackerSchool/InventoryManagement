module.exports.up = async (knex) => {
  await knex.schema.table('members', (table) => {
    table.enum('role', ['admin', 'user']).notNullable().defaultTo('user');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.table('members', (table) => {
    table.dropColumn('role');
  });
};
