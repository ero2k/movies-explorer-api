const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const Unauthorized = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  console.log(req)

  const token = req.cookies.jwt;
  if (!token) {
    throw new Unauthorized('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'allcatsarebeautiful');
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }
  req.user = payload;

  next();
};
