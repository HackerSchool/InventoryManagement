module.exports = {
  findAll: async (database) => {
    const result = await database.select('id', 'name', 'description').from('locations');

    return result.map((location) => ({
      id: location.id,
      name: location.name,
      description: location.description,
    }));
  },

  findOne: async (database, id) => {
    const result = await database
      .select('id', 'name', 'description')
      .where('id', id)
      .from('locations');

    if (result.length === 0) return;
    return result[0];
  },

  create: async (database, { name, description }) => {
    const result = await database.insert({ name, description });
    return result;
  },

  remove: async (database, id) => {
    const result = await database.where('id', id).from('locations').delete();
    return result;
  },

  update: async (database, id, data) => {
    const result = await database.where('id', id).update(data, ['id', 'name', 'description']);
    return result[0];
  },
};
