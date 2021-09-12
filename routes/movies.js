const router = require('express').Router();
const {
  createMoviesLocalDB, getSavedMovies, removeSavedMovie,
} = require('../controllers/movies');
const { validateCreateMovie, validateRemoveMovie } = require('../middlewares/validate');

router.get('/movies', getSavedMovies);
router.post('/movies', validateCreateMovie, createMoviesLocalDB);
router.delete('/movies/:movieId', validateRemoveMovie, removeSavedMovie);

module.exports = router;
