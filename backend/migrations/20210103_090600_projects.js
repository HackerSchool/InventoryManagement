module.exports.up = async (knex) => {
  await knex.schema.createTable('projects', (table) => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.text('description');
  });

  await knex.schema.table('requisitions', (table) => {
    table
      .integer('id_project')
      .unsigned()
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.table('requisitions', (table) => {
    table.dropForeign('id_project');
    table.dropColumn('id_project');
  });
  await knex.schema.dropTableIfExists('projects');
};
