/*
This migration will add an 'images_id' column to the 'materials' table,
which will link an image to a material.
*/

module.exports.up = async (knex) => {
  await knex.schema.table('materials', (table) => {
    table
      .integer('image_id')
      .unsigned()
      .references('id')
      .inTable('images')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.table('materials', (table) => {
    table.dropForeign('image_id');
    table.dropColumn('image_id');
  });
};
