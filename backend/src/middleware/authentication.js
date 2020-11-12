const { verify } = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'hackerschool-is-cool';

const roles = {
  user: 0,
  admin: 1,
};

const hasPermission = (role) => (level) => (roles[role] || 0) >= (roles[level] || 0);

const buildUser = ({ id, istId, name, role }) => ({
  hasPermission: hasPermission(role),
  id,
  istId,
  name,
  role,
});

const authenticateJWT = (req, _res, next) => {
  const authHeader = req.headers['authorization'];
  const header = authHeader && authHeader.split(' ');
  if (!header || header.length != 2 || header[0] != 'Bearer') {
    next();
    return;
  }
  const token = header[1];

  verify(token, JWT_SECRET, (err, user) => {
    if (!err) req.user = buildUser(user);
    next();
  });
};

module.exports = {
  authenticateJWT,
};
