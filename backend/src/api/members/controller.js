module.exports = {
  findAll: async (database) => {
    const result = await database.select('id', 'name', 'ist_id', 'active', 'role').from('members');
    return result.map((member) => ({
      id: member.id,
      name: member.name,
      istId: member.ist_id,
      active: member.active,
      role: member.role,
    }));
  },
};
