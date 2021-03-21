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

    const members = await database
      .select('id', 'name', 'ist_id')
      .where('project_id', id)
      .from('members')
      .leftJoin('project_members', 'members.id', 'project_members.member_id');

    return {
      ...result[0],
      members: members.map(({ id, name, ist_id }) => ({ id, name, istId: ist_id })),
    };
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
