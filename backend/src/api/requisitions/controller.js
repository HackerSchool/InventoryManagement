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
};
