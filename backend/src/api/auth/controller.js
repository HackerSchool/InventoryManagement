const { generateJWT, fenixLogin, getFenixAbout } = require('./services');
const imagesController = require('../images/controller');
const membersController = require('../members/controller');

module.exports = {
  fenixLogin: async (database, code) => {
    const fenixAccessToken = await fenixLogin(code);
    if (!fenixAccessToken) return {};

    const { username: fenixUsername, photo } = await getFenixAbout(fenixAccessToken);
    if (!fenixAccessToken) return {};
    if (!fenixUsername) return {};

    const result = await database
      .select(
        'members.id',
        'members.name',
        'members.ist_id',
        'members.active',
        'members.role',
        'image_id'
      )
      .from('members')
      .where({ ist_id: fenixUsername, active: true });
    // User does not belong to HackerSchool
    if (result.length !== 1) return {};

    const user = {
      id: result[0].id,
      name: result[0].name,
      istId: result[0].ist_id,
      active: result[0].active,
      role: result[0].role,
      avatar: result[0].image_id,
    };

    if (result[0].image_id === null && photo) {
      user.avatar = await imagesController.upload(database, {
        data: Buffer.from(photo.data, 'base64'),
        name: fenixUsername,
      });
      await membersController.update(database, user.id, { image_id: user.avatar });
    }

    const jwt = generateJWT(user);

    return { user, jwt };
  },
};
