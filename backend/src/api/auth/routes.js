const controller = require('./controller');

module.exports = {
  availableAuth: async (req, res) => {
    res.json(controller.getAvailableAuthMethods());
  },

  demoLogin: async (req, res) => {
    const { role } = req.params;

    const { user, jwt } = await controller.demoLogin(role);

    if (!user || !jwt) {
      // user is not authorized to login or fenix login failed
      res.sendStatus(401);
      return;
    }

    res.json({ user, jwt });
  },

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

  userProfile: async (req, res) => {
    if (!req.user) return res.sendStatus(401);

    res.json(req.user);
  },
};
