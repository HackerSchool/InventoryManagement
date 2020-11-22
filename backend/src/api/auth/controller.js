const { generateJWT, fenixLogin, getFenixUsername } = require('./services');

module.exports = {
  fenixLogin: async (database, code) => {
    const fenixAccessToken = await fenixLogin(code);
    if (!fenixAccessToken) return {};

    const fenixUsername = await getFenixUsername(fenixAccessToken);
    if (!fenixAccessToken) return {};

    const result = await database
      .select('id', 'name', 'ist_id', 'active')
      .from('members')
      .where({ ist_id: fenixUsername, active: true });
    // User does not belong to HackerSchool
    if (result.length !== 1) return {};

    const user = {
      id: result[0].id,
      name: result[0].name,
      istId: result[0].ist_id,
      active: result[0].active,
      role: 'admin',
    };

    const jwt = generateJWT(user);

    return { user, jwt };
  },
};
