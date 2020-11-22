const JWT_SECRET = process.env.JWT_SECRET || 'hackerschool-is-cool';
const { sign } = require('jsonwebtoken');

function JWTGenerator(id, istId, name, role) {
  const tokenPayload = { id, istId, name, role };
  const token = sign(tokenPayload, JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 });
  return token;
}
module.exports = { JWTGenerator }