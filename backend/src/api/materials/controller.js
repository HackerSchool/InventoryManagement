module.exports = {
  async findAll(database) {
    const result = await database
      .select('id', 'name', 'description', 'stock', 'state', 'type', 'location_id')
      .from('materials');

    return result.map((material) => ({
      id: material.id,
      name: material.name,
      description: material.description,
      stock: material.stock,
      state: material.state,
      type: material.type,
      location_id: material.location_id,
    }));
  },

  async findOne(database, id) {
    const result = await database
      .select('id', 'name', 'description')
      .where('id', id)
      .from('locations');

    if (result.length === 0) return;
    return result[0];
  },

  async create(database, { name, description }) {
    const result = await database.insert({ name, description }).into('locations');

    // Knex returns the inserted id, so we get the object from the database.
    return this.findOne(database, result[0]);
  },

  async remove(database, id) {
    const affectedRows = await database.where('id', id).from('locations').delete();
    return affectedRows > 0;
  },

  async update(database, id, data) {
    const affectedRows = await database('locations').where('id', id).update(data);
    if (affectedRows > 0) return this.findOne(database, id);
    // else return undefined
  },
};
