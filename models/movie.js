const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, { require_protocol: true }),
      message: 'Неверный формат данных',
    },
  },
  trailer : {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, { require_protocol: true }),
      message: 'Неверный формат данных',
    },
  },
  thumbnail : {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, { require_protocol: true }),
      message: 'Неверный формат данных',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    default: 0,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('movie', userSchema);
