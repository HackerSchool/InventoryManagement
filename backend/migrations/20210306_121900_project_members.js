module.exports.up = async (knex) => {
  await knex.schema.createTable('project_members', (table) => {
    table
      .integer('member_id')
      .unsigned()
      .references('id')
      .inTable('members')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('project_id')
      .unsigned()
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('project_members');
};
