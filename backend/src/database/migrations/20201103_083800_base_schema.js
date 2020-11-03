module.exports.up = async (knex) => {
  await knex.schema.createTable('members', (table) => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('ist_id', 12);
    table.boolean('active').defaultTo(true);
  });

  await knex.schema.createTable('locations', (table) => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.text('description');
  });

  await knex.schema.createTable('material', (table) => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.text('description');
    table.integer('stock').defaultTo(1);
    table.string('state', 25);
    table.string('type', 25).defaultTo('item');
    table
      .integer('location_id')
      .unsigned()
      .references('id')
      .inTable('locations')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
  });

  await knex.schema.createTable('requisitions', (table) => {
    table.increments('id');
    table
      .integer('id_member')
      .unsigned()
      .references('id')
      .inTable('members')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    table
      .integer('id_material')
      .unsigned()
      .references('id')
      .inTable('material')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    table.integer('quantity').defaultTo(1);
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('date_out').nullable();
    table.datetime('date_in').nullable();
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('members');
  await knex.schema.dropTableIfExists('locations');
  await knex.schema.dropTableIfExists('material');
  await knex.schema.dropTableIfExists('requisitions');
};
