/*
This migration will add a unique index to the 'ist_id' column of 'members'
*/

module.exports.up = async (knex) => {
  await knex.schema.table('members', (table) => {
    table.unique('ist_id');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.table('materials', (table) => {
    table.dropUnique('ist_id');
  });
};
