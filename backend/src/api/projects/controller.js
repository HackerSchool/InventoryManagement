module.exports = {
  async findAll(database) {
    const result = await database.select('id', 'name', 'description', 'state').from('projects');

    return result.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      state: project.state,
    }));
  },

  async findOne(database, id) {
    const result = await database
      .select('id', 'name', 'description', 'state')
      .where('id', id)
      .from('projects');

    if (result.length === 0) return;

    const members = await database
      .select('id', 'name', 'ist_id')
      .where('project_id', id)
      .from('members')
      .leftJoin('project_members', 'members.id', 'project_members.member_id');

    const cost = (await this.getProjectPurchases(database, id)).reduce(
      (acc, { value, quantity }) => acc + value * quantity,
      0
    );

    return {
      ...result[0],
      cost: parseFloat(cost.toFixed(2)), // fix floating point errors
      members: members.map(({ id, name, ist_id }) => ({ id, name, istId: ist_id })),
    };
  },

  async getProjectPurchases(database, id) {
    const purchases = await database
      .select('materials.value', 'requisitions.quantity')
      .whereIn('requisitions.state', ['can_pickup', 'active', 'not_returning'])
      .where('id_project', id)
      .from('requisitions')
      .leftJoin('materials', 'materials.id', 'requisitions.id_material');

    return [...purchases];
  },

  async create(database, { name, description, state = 'active' }) {
    const result = await database.insert({ name, description, state }).into('projects');

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

  async addMember(database, member_id, project_id) {
    try {
      // Prevent duplicate entries
      const hasMember = await database('project_members')
        .count({ count: 'member_id' })
        .where('member_id', member_id)
        .andWhere('project_id', project_id);

      if (hasMember[0].count > 0) return this.findOne(database, project_id);

      await database('project_members').insert({ project_id, member_id });
      return this.findOne(database, project_id);
    } catch (e) {
      if (e.code === 'ER_NO_REFERENCED_ROW_2') return; // member or project don't exist
      throw e;
    }
  },

  async removeMember(database, member_id, project_id) {
    try {
      await database
        .where('member_id', member_id)
        .andWhere('project_id', project_id)
        .from('project_members')
        .delete();
      return this.findOne(database, project_id);
    } catch (e) {
      if (e.code === 'ER_NO_REFERENCED_ROW_2') return; // member or project don't exist
      throw e;
    }
  },
};
