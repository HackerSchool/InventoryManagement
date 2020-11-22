const controller = require('./controller');

module.exports = {
  fenixLogin: async (req, res) => {
    const { code } = req.query;

    if (!code) {
      // send 'bad request' if code is not set
      res.sendStatus(400);
      return;
    }

    const { user, jwt } = await controller.fenixLogin(req.db, code);

    if (!user || !jwt) {
      // user is not authorized to login or fenix login failed
      res.sendStatus(401);
      return;
    }

    res.json({ user, jwt });
  },
};
