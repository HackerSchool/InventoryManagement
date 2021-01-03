const REQ_STATUS = ['pending', 'cancelled', 'can_pickup', 'active', 'returned', 'not_returning'];

const fields = [
  'requisitions.id',
  'requisitions.quantity',
  'requisitions.created_at',
  'requisitions.date_out',
  'requisitions.date_in',
  'requisitions.state',
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
  createdAt: response.created_at,
  dateIn: response.date_in,
  dateOut: response.date_out,
  state: response.state,
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
      .orderBy('requisitions.created_at', 'desc')
      .leftJoin('materials', 'requisitions.id_material', 'materials.id')
      .leftJoin('members', 'requisitions.id_member', 'members.id')
      .leftJoin('projects', 'requisitions.id_project', 'projects.id');
    return result.map(formatResponse);
  },

  async findOne(database, id) {
    const result = await database
      .select(...fields)
      .where('requisitions.id', id)
      .leftJoin('materials', 'requisitions.id_material', 'materials.id')
      .leftJoin('members', 'requisitions.id_member', 'members.id')
      .leftJoin('projects', 'requisitions.id_project', 'projects.id')
      .from('requisitions');

    if (result.length === 0) return;
    return formatResponse(result[0]);
  },

  async findSelf(database, memberId) {
    const result = await database
      .select(...fields)
      .where({ 'requisitions.id_member': memberId })
      .from('requisitions')
      .orderBy('requisitions.created_at', 'desc')
      .leftJoin('materials', 'requisitions.id_material', 'materials.id')
      .leftJoin('members', 'requisitions.id_member', 'members.id')
      .leftJoin('projects', 'requisitions.id_project', 'projects.id');
    return result.map(formatResponse);
  },

  async create(database, data) {
    try {
      const result = await database.transaction(async (trx) => {
        // UPDATE materials SET stock = stock - qnt WHERE id = id AND stock >= qnt
        const affectedRows = await trx('materials')
          .decrement('stock', data.quantity)
          .where('id', data.id_material)
          .andWhere('stock', '>=', data.quantity);

        // material does not exist or does not have enough stock
        if (affectedRows === 0) throw { code: 'NO_STOCK' };

        return trx.insert(data).into('requisitions');
      });
      return this.findOne(database, result[0]);
    } catch (e) {
      // foreign key constraint fails while inserting (one or more relations are incorrect)
      if (e.code != 'ER_NO_REFERENCED_ROW_2' && e.code != 'NO_STOCK') throw e;
      return null;
    }
  },

  async update(database, id, data, isAdmin, memberId) {
    // Normal users should only be able to change state
    if (!isAdmin && (Object.keys(data).length > 1 || Object.keys(data).indexOf('state') == -1))
      return;
    try {
      await database.transaction(async (trx) => {
        if (data.state) {
          const oldReq = await trx
            .select('state', 'quantity', 'id_material', 'id_member')
            .from('requisitions')
            .where('id', id);
          if (oldReq.length == 0) throw { code: 'NOT_FOUND' };
          const { state: oldState, quantity, id_material, id_member } = oldReq[0];

          if (data.state != oldState) {
            if (
              !isAdmin &&
              (memberId != id_member || (data.state != 'active' && oldState != 'can_pickup'))
            )
              throw { code: 'NO_PERMISSION' };

            // don't allow returned requisitions to change state; client should create a new one if needed
            if (oldState == 'returned' || oldState == 'cancelled') throw { code: 'NOT_ALLOWED' };

            // handle stock update
            if (data.state == 'returned' || data.state == 'cancelled') {
              // UPDATE materials SET stock = stock + qnt WHERE id = id
              await trx('materials').increment('stock', quantity).where('id', id_material);
              if (data.state == 'returned') data.date_in = database.fn.now();
            }

            const activeIndex = REQ_STATUS.indexOf('active');
            // if new state is 'active' or after that, set date out
            if (
              REQ_STATUS.indexOf(data.state) >= activeIndex &&
              REQ_STATUS.indexOf(oldState) < activeIndex
            )
              data.date_out = database.fn.now();

            // if new state is before 'after', remove date out
            if (
              REQ_STATUS.indexOf(data.state) < activeIndex &&
              REQ_STATUS.indexOf(oldState) >= activeIndex
            )
              data.date_out = null;
          }
        }
        const affectedRows = await database('requisitions').where('id', id).update(data);
        if (affectedRows == 0) throw { code: 'NOT_FOUND' };
      });
      return this.findOne(database, id);
    } catch (e) {
      if (e.code == 'NOT_FOUND') return; // return undefined
      if (e.code == 'NO_PERMISSION') return false;

      // foreign key constraint fails while inserting (one or more relations are incorrect)
      if (
        e.code != 'ER_NO_REFERENCED_ROW_2' &&
        e.code != 'NOT_ALLOWED' &&
        e.code != 'INVALID_NEW_STATE'
      )
        throw e;
      return null;
    }
  },
};
