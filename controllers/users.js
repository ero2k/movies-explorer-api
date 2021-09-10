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

module.exports.createUser = (req, res, next) => {
  return  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ ...req.body, password: hash }))
    .then(() => res.status(201).send({ message: 'Пользователь зарегистрирован' }))
    .catch((err) => {
      console.log(err.name)
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new Conflict('Такой пользователь уже зарегистрирован'));
      }
      next(new InvalidDataFormat('Неверный формат данных 3'));
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'allcatsarebeautiful', { expiresIn: '7d' });

      return res.status(200).send({ message: 'Авторизация успешна', token });
    })
    .catch((err) => next(err));
};
