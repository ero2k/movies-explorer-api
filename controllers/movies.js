const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const InvalidDataFormat = require('../errors/invalid-data-format');
const Forbidden = require('../errors/forbidden');
const {
  NOT_FOUND_MOVIE_MSG,
  VALID_ERROR,
  BAD_DATA_MSG,
  OTHER_PEOPLES_MOVIES_MSG,
  REMOVE_MOVIE_MSG,
  MOVIE_NOT_FOUND_MSG,
  CAST_ERROR,
} = require('../utils/constants');

module.exports.getSavedMovies = (req, res, next) => {
  Movie.findById(req.user._id)
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.createMoviesLocalDB = (req, res, next) => {

  console.log(req.user, req.body)

  Movie.create({
      ...req.body,
      owner: req.user._id
    })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === VALID_ERROR) {
        next(new InvalidDataFormat(BAD_DATA_MSG));
      } else {
        next(err);
      }
    });
};

module.exports.removeSavedMovie = (req, res, next) => {
  const {
    movieId
  } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_MOVIE_MSG);
      } else if (String(movie.owner) !== String(req.user._id)) {
        throw new Forbidden(OTHER_PEOPLES_MOVIES_MSG);
      }
      return Movie.findByIdAndRemove(movieId)
        .then((movieToRemove) => {
          if (movieToRemove) {
            return res.status(200).send({
              message: REMOVE_MOVIE_MSG
            });
          }
          throw new NotFoundError(MOVIE_NOT_FOUND_MSG);
        });
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new InvalidDataFormat(BAD_DATA_MSG));
      }
      return next(err);
    });
};