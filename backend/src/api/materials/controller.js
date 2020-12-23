const fields = [
  'materials.id',
  'materials.name',
  'materials.description',
  'stock',
  'state',
  'type',
  'value',
  { locationId: 'location_id' },
  { locationName: 'locations.name' },
  { locationDesc: 'locations.description' },
];

const formatResponse = (response) => ({
  id: response.id,
  name: response.name,
  description: response.description,
  stock: response.stock,
  state: response.state,
  type: response.type,
  value: response.value,
  location: {
    id: response.locationId,
    name: response.locationName,
    description: response.locationDesc,
  },
});

module.exports = {
  async findAll(database, { query, sort, limit, offset, state, type }) {
    let result = database
      .select(...fields)
      .from('materials')
      .leftJoin('locations', 'materials.location_id', 'locations.id');
    if (query)
      result = result.andWhere(function () {
        this.whereRaw(
          'MATCH (`materials`.`name`, `materials`.`description`) AGAINST(? IN BOOLEAN MODE)',
          [query]
        ).orWhere('materials.name', 'like', `%${query}%`);
      });
    if (sort) {
      const [col, order] = sort.split(':');
      result = result.orderBy(`materials.${col}`, order);
    }
    if (limit) result = result.limit(limit);
    if (offset) result = result.offset(offset);
    if (state) result = result.andWhere('materials.state', 'in', state.split(','));
    if (type) result = result.andWhere('materials.type', 'in', type.split(','));

    return (await result).map(formatResponse);
  },

  async countAll(database, { query, state, type }) {
    let result = database.count('*').from('materials').debug();
    if (query)
      result = result.andWhere(function () {
        this.whereRaw(
          'MATCH (`materials`.`name`, `materials`.`description`) AGAINST(? IN BOOLEAN MODE)',
          [query]
        ).orWhere('materials.name', 'like', `%${query}%`);
      });
    if (state) result = result.andWhere('materials.state', 'in', state.split(','));
    if (type) result = result.andWhere('materials.type', 'in', type.split(','));

    return (await result)[0]['count(*)'];
  },

  async findOne(database, id) {
    const result = await database
      .select(...fields)
      .where('materials.id', id)
      .leftJoin('locations', 'materials.location_id', 'locations.id')
      .from('materials');

    if (result.length === 0) return;
    return formatResponse(result[0]);
  },

  async create(database, data) {
    try {
      const result = await database.insert(data).into('materials');

      // Knex returns the inserted id, so we get the object from the database.
      return this.findOne(database, result[0]);
    } catch (e) {
      // Return null if provided location does not exist
      if (e.code != 'ER_NO_REFERENCED_ROW_2') throw e;
      return null;
    }
  },

  async remove(database, id) {
    const affectedRows = await database.where('id', id).from('materials').delete();
    return affectedRows > 0;
  },

  async update(database, id, data) {
    try {
      const affectedRows = await database('materials').where('id', id).update(data);
      if (affectedRows > 0) return this.findOne(database, id);
      // else return undefined
    } catch (e) {
      // Return undefined if provided location does not exist
      if (e.code != 'ER_NO_REFERENCED_ROW_2') throw e;
      return null;
    }
  },
};
