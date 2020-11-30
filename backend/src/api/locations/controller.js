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
    // TODO
  },

  update: async (database, id, data) => {
    // TODO
  },
};
