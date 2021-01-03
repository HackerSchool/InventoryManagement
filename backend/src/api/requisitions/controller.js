const fields = [
  'requisitions.id',
  'requisitions.quantity',
  'requisitions.created_at',
  'requisitions.date_out',
  'requisitions.date_in',
  { memberId: 'id_member' },
  { memberName: 'members.name' },
  { memberIstId: 'members.ist_id' },
  { materialId: 'id_material' },
  { materialName: 'materials.name' },
  { projectId: 'id_project' },
  { projectName: 'projects.name' },
  { projectDescription: 'projects.description' },
];

const formatResponse = (response) => ({
  id: response.id,
  quantity: response.quantity,
  created_at: response.created_at,
  date_in: response.date_in,
  date_out: response.date_out,
  material: response.materialId ? { id: response.materialId, name: response.materialName } : null,
  member: response.memberId
    ? { id: response.memberId, istId: response.memberIstId, name: response.memberName }
    : null,
  project: response.projectId
    ? {
        id: response.projectId,
        name: response.projectName,
        description: response.projectDescription,
      }
    : null,
});

module.exports = {
  async findAll(database) {
    const result = await database
      .select(...fields)
      .from('requisitions')
      .leftJoin('materials', 'requistions.id_material', 'materials.id')
      .leftJoin('members', 'requisitions.id_members', 'members.id')
      .leftJoin('projects', 'requisitions.id_project', 'projects.id');
    return result.map(formatResponse);
  },

  async findOne(database, id) {
    const result = await database
      .select(...fields)
      .where('requisitions.id', id)
      .leftJoin('materials', 'requistions.id_materials', 'materials.id')
      .leftJoin('members', 'requisitions.id_members', 'members.id')
      .from('requisitions');

    if (result.length === 0) return;
    return formatResponse(result[0]);
  },

  async findSelf(database, memberId) {
    const result = await database
      .select(...fields)
      .where({ 'requisitions.member.id': memberId })
      .from('requisitions')
      .leftJoin('materials', 'requistions.id_material', 'materials.id')
      .leftJoin('members', 'requisitions.id_members', 'members.id')
      .leftJoin('projects', 'requisitions.id_project', 'projects.id');
    return result.map(formatResponse);
  },

  async create(database, data) {
    try {
      const result = await database.insert(data).into('requisitions');
      return this.findOne(database, result[0]);
    } catch (e) {
      // foreign key constraint fails while inserting (one or more relations are incorrect)
      if (e.code != 'ER_NO_REFERENCED_ROW_2') throw e;
      return null;
    }
  },
};
