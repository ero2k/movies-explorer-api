const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const InvalidDataFormat = require('../errors/invalid-data-format');
const Conflict = require('../errors/conflict');
const {
  VALID_ERROR, BAD_DATA_MSG, CAST_ERROR, USER_NOT_FOUND_MSG, MONGO_SERVER_ERROR,
  DUPLICATE_KEY, EMAIL_IS_ALREADY_MSG, USER_IS_REGISTERED_MSG, AUTHORIZATION_IS_SUCCESSFUL,
  TOKEN_REMOVE_MSG,
} = require('../utils/constants');

const opt = {
  new: true,
  runValidators: true,
};

module.exports.getCurrentUser = (req, res, next) => {
  const currentUser = req.user._id;
  User.find({ _id: currentUser })
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError(USER_NOT_FOUND_MSG);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new InvalidDataFormat(BAD_DATA_MSG));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const user = req.user._id;
  if (!user) {
    throw new InvalidDataFormat(BAD_DATA_MSG);
  }

  return User.findByIdAndUpdate({ _id: user }, { ...req.body }, opt)
    .then((data) => {
      if (user) {
        return res.status(200).send(data);
      }
      throw new NotFoundError(USER_NOT_FOUND_MSG);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR || err.name === VALID_ERROR) {
        next(new InvalidDataFormat(BAD_DATA_MSG));
      } else if (err.name === MONGO_SERVER_ERROR && err.codeName === DUPLICATE_KEY) {
        next(new Conflict(EMAIL_IS_ALREADY_MSG));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => bcrypt.hash(req.body.password, 10)
  .then((hash) => User.create({ ...req.body, password: hash }))
  .then((data) => {
    const token = jwt.sign({ _id: data._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });
    return res.cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
    }).status(201).send({message: USER_IS_REGISTERED_MSG, token })})
  .catch((err) => {
    if (err.name === MONGO_SERVER_ERROR && err.code === 11000) {
      next(new Conflict(EMAIL_IS_ALREADY_MSG));
    } else {
      next(new InvalidDataFormat(BAD_DATA_MSG));
    }
  });

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });
      return res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      }).status(202).send({ message: AUTHORIZATION_IS_SUCCESSFUL });
    })
    .catch((err) => next(err));
};

module.exports.signout = (req, res) => {
  res.clearCookie('jwt');
  return res.status(200).send({ message: TOKEN_REMOVE_MSG });
};
