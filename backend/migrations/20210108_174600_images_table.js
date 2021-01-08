/*
This migration will add an 'images' table that saves information about the
images in the `upload` folder.
*/

module.exports.up = async (knex) => {
  await knex.schema.createTable('images', (table) => {
    table.increments('id');
    table.string('src');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('images');
};
