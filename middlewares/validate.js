const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const InvalidDataFormat = require('../errors/invalid-data-format');

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: (link) => {
      if (!validator.isURL(link, { require_protocol: true })) {
        throw new InvalidDataFormat('Неверный формат данных');
      }
      return link;
    },
    trailer: (link) => {
      if (!validator.isURL(link, { require_protocol: true })) {
        throw new InvalidDataFormat('Неверный формат данных');
      }
      return link;
    },
    thumbnail: (link) => {
      if (!validator.isURL(link, { require_protocol: true })) {
        throw new InvalidDataFormat('Неверный формат данных');
      }
      return link;
    },
    id: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validateRemoveMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});
