const mongoose = require('mongoose');
const validator = require('validator');
const {BAD_DATA_MSG} = require('../utils/constants')

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

  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, { require_protocol: true }),
      message: BAD_DATA_MSG,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, { require_protocol: true }),
      message: BAD_DATA_MSG,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
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
