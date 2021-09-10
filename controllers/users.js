const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/not-found-err');
const InvalidDataFormat = require('../errors/invalid-data-format');
const Conflict = require('../errors/conflict');

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
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidDataFormat('Неверный формат данных'));
      }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const user = req.user._id;
  if (!user) {
    throw new InvalidDataFormat('Неверный формат данных');
  }

  return User.findByIdAndUpdate({ _id: user }, { ...req.body }, opt)
    .then((data) => {
      if (user) {
        return res.status(200).send(data);
      }
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new InvalidDataFormat('Неверный формат данных'));
      }
      next(err);
    });
};
