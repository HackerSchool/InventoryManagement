/*
This migration will add a FULLTEXT index to the 'name' and 'description'
columns of the 'materials' table.
*/

module.exports.up = async (knex) => {
  await knex.schema.table('materials', (table) => {
    table.index(['name', 'description'], 'materials_search', 'FULLTEXT');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.table('materials', (table) => {
    table.dropIndex(['name', 'description'], 'materials_search');
  });
};
