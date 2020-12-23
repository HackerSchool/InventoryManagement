const { create } = require("../locations/routes");

const fields = [
  'requisitions.id',
  'requisitions.quantity',
  'requisitions.created_at',
  'requisitions.date_out',
  'requisitions.date_in',
  { memberId: 'member_id' },
  { memberName: 'members.name' },
  { memberIstId: 'members.ist_id' },
  { materialId: 'material_id' },
  { materialName: 'materials.name' },
];

const formatResponse = (response) => ({
  id: response.id,
  quantity: response.quantity,
  created_at: response.created_at,
  date_in: response.date_in,
  date_out: response.date_out,
  material: { id: response.materialId, name: response.materialName },
  member: { id: response.memberId, istId: response.memberIstId, name: response.memberName },
});

module.exports = {
  async findAll(database) {
    const result = await database
      .select(...fields)
      .from('requisitions')
      .leftJoin('materials', 'requistions.id_materials', 'materials.id')
      .leftJoin('members', 'requisitions.id_members', 'members.id');
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

  async findSelf(database, id, memberId) {
    const result = await database
      .select(...fields)
      .where({ 'requisitions.id': id, 'requisitions.member.id': memberId })
      .leftJoin('materials', 'requistions.id_materials', 'materials.id')
      .leftJoin('members', 'requisitions.id_members', 'members.id')
      .from('requisitions');

    if (result.length === 0) return;
    return formatResponse(result[0]);
  },

  async create(database, data) {
    try {
      const result = await database.insert(data).into('requisitions');
      return this.findOne(database, result[0]);
    } catch (e) {
      if (e.code != 'ER_NO_REFERENCED_ROW_2') throw e;
      return null;
    }
};
