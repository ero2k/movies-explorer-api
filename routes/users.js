const router = require('express').Router();
const {
  updateProfile, getCurrentUser, signout,
} = require('../controllers/users');
const { validateUpdateProfile } = require('../middlewares/validate');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', validateUpdateProfile, updateProfile);
router.get('/signout', signout);

module.exports = router;
