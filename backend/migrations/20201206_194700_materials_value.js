/*
This migration will add a 'value' column to the 'material' table.
It will also rename the table from 'material' to 'materials', for consistency between models.
*/

module.exports.up = async (knex) => {
  await knex.schema.renameTable('material', 'materials');
  await knex.schema.table('materials', (table) => {
    table.decimal('value').defaultTo(0).notNullable(); // Value, in EUR, of the item
  });
};

module.exports.down = async (knex) => {
  await knex.schema.table('materials', (table) => {
    table.dropColumn('value');
  });
  await knex.schema.renameTable('materials', 'material');
};
