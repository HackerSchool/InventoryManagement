module.exports = {
  async findAll(database) {
    const result = await database.select('id', 'name', 'description').from('projects');

    return result.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
    }));
  },

  async findOne(database, id) {
    const result = await database
      .select('id', 'name', 'description')
      .where('id', id)
      .from('projects');

    if (result.length === 0) return;
    return result[0];
  },

  async create(database, { name, description }) {
    const result = await database.insert({ name, description }).into('projects');

    // Knex returns the inserted id, so we get the object from the database.
    return this.findOne(database, result[0]);
  },

  async remove(database, id) {
    try {
      const affectedRows = await database.where('id', id).from('projects').delete();
      return affectedRows > 0;
    } catch (e) {
      // Handle logic if project is being used
      if (e.code !== 'ER_ROW_IS_REFERENCED_2') throw e;
      return null;
    }
  },

  async update(database, id, data) {
    const affectedRows = await database('projects').where('id', id).update(data);
    if (affectedRows > 0) return this.findOne(database, id);
    // else return undefined
  },
};
