const fields = ['id', 'name', 'role', 'active', 'ist_id'];

const formatResponse = (response) => ({
  id: response.id,
  name: response.name,
  istId: response.ist_id,
  active: response.active === 1 ? true : false,
  role: response.role,
});

module.exports = {
  async findAll(database) {
    const result = await database.select('id', 'name', 'ist_id', 'active', 'role').from('members');
    return result.map(formatResponse);
  },

  async findOne(database, id) {
    const result = await database
      .select(...fields)
      .where('id', id)
      .from('members');

    if (result.length === 0) return;
    return formatResponse(result[0]);
  },

  async create(database, data) {
    const result = await database.insert(data).into('members');
    return this.findOne(database, result[0]);
  },

  async update(database, id, data) {
    const affectedRows = await database('members').where('id', id).update(data);
    if (affectedRows > 0) return this.findOne(database, id);
    return null;
  },

  async remove(database, id) {
    try {
      const affectedRows = await database.where('id', id).from('members').delete();
      return affectedRows > 0;
    } catch (e) {
      // Handle logic if location is being used
      if (e.code !== 'ER_ROW_IS_REFERENCED_2') throw e;
      return null;
    }
  },
};
