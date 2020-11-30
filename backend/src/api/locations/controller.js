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
    // TODO
  },

  create: async (database, data) => {
    // TODO
  },

  remove: async (database, id) => {
    // TODO
  },

  update: async (database, id, data) => {
    // TODO
  },
};
