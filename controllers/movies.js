const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const InvalidDataFormat = require('../errors/invalid-data-format');
const Forbidden = require('../errors/forbidden');

const mongoose = require('mongoose');


module.exports.getSavedMovies = (req, res, next) => {
Movie.find({})
  .then((movies) => res.status(200).send(movies))
  .catch(next)
}

module.exports.createMoviesLocalDB = (req, res, next) => {
  Movie.create({...req.body, owner: '60a676875e223d249f6ca728', movieId: req.body.id})
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataFormat('Неверный формат данных'));
      }
      next(err);
    })
}

module.exports.removeSavedMovie = (req, res, next) => {
  console.log(req)
  const movieId = req.params.movieId;
  console.log(movieId)

  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    throw new InvalidDataFormat('Неверный формат данных');
  } else {
    Movie.findById(movieId)
      .then((movie) => {
        if (!movie) {
          throw new NotFoundError('Фильм не найден');
        } else if (String(movie.owner) !== String(req.user._id)) {
          throw new Forbidden('Вы не можете удалять фильмы из чужого сохранения');
        }
        Movie.findByIdAndRemove(movieId)
          .then((movieToRemove) => {
            if (movieToRemove) {
              return res.status(200).send({ message: 'Фильм удален из сохраненных' });
            }
            throw new NotFoundError('Фильм не найден!');
          });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
         return next(new InvalidDataFormat('Неверный формат данных'));
        }
        return next(err);
      });
  }
};
