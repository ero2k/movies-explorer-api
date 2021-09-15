const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV, NEED_AUTHORIZED_MSG } = require('../utils/constants');
const Unauthorized = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  console.log(req);

  const token = req.cookies.jwt;
  if (!token) {
    throw new Unauthorized(NEED_AUTHORIZED_MSG);
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    throw new Unauthorized(NEED_AUTHORIZED_MSG);
  }
  req.user = payload;

  next();
};
