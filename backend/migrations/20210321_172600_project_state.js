/*
This migration will add a 'state' field to the 'projects' table.
*/

module.exports.up = async (knex) => {
  await knex.schema.alterTable('projects', (table) => {
    // enum: "active", "finished", "abandoned"
    table.string('state', 25).notNullable().default('active');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.alterTable('projects', (table) => {
    table.dropColumn('state');
  });
};
