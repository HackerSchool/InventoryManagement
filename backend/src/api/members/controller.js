module.exports = {
  findAll: (database) => database.select('id', 'name', 'ist_id', 'active').from('members'),
};
