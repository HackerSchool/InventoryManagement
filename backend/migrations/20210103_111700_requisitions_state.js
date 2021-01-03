/*
This migration will add a 'state' field to the 'requisitions' table.
It will also make 'id_material' and 'id_member' non-nullable.
*/

module.exports.up = async (knex) => {
  await knex.schema.alterTable('requisitions', (table) => {
    table.integer('id_member').unsigned().notNullable().alter();
    table.integer('id_material').unsigned().notNullable().alter();

    // enum: "pending", "cancelled", "can_pickup", "active", "returned", "not_returning"
    table.string('state', 25).notNullable().default('pending');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.alterTable('requisitions', (table) => {
    table.dropColumn('state');
    table.integer('id_material').unsigned().nullable().alter();
    table.integer('id_member').unsigned().nullable().alter();
  });
};
