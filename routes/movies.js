const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const InvalidDataFormat = require('../errors/invalid-data-format');
const {
  createMoviesLocalDB, getSavedMovies, removeSavedMovie
} = require('../controllers/movies');

// const auth = require('../middlewares/auth');

router.get('/movies',getSavedMovies )
router.post('/movies',createMoviesLocalDB )
router.delete('/movies/movieId ',removeSavedMovie)


module.exports = router;
