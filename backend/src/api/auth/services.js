const JWT_SECRET = process.env.JWT_SECRET || 'hackerschool-is-cool';
const  { sign } = require('jsonwebtoken');

function JWTgenerator(id, istId, name, role){
  var Tpayload = { id, istId, name, role };
  var Token = sign(Tpayload, JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 });
  return Token;
}
