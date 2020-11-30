module.exports = {
  findAll: async (database) => {
    const result = await database.select('id', 'name', 'description').from('locations');

    return result.map((location) => ({
      id: location.id,
      name: location.name,
      description: location.description,
    }));
  },
};
