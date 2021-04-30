/*
This migration will alter the 'images' table by adding a column to store
the image in the database as binary data.
THIS WILL DELETE ALL EXISTING IMAGES FROM THE DATABASE
*/

module.exports.up = async (knex) => {
  // Delete all images from database, since they won't work correctly
  // THIS IS A DESTRUCTIVE ACTION
  await knex('images').delete();
  await knex.schema.table('images', (table) => {
    table.dropColumn('src');
    table.binary('image');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.table('images', (table) => {
    table.dropColumn('image');
    table.string('src');
  });
};
