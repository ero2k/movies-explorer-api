const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const InvalidDataFormat = require('../errors/invalid-data-format');
const {
  updateProfile, getCurrentUser
} = require('../controllers/users');

// const auth = require('../middlewares/auth');

router.get('/users/me', getCurrentUser)
router.patch('/users/me', updateProfile)

module.exports = router;
