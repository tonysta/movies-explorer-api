const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexUrl } = require('../utils/constatnts');

const { getSavedMovies, saveMovie, deleteSavedMovie } = require('../controllers/movies');

moviesRouter.get('/movies/', getSavedMovies);
moviesRouter.post('/movies/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(regexUrl).required(),
    trailerLink: Joi.string().regex(regexUrl).required(),
    thumbnail: Joi.string().regex(regexUrl).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), saveMovie);

moviesRouter.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
}), deleteSavedMovie);

module.exports = moviesRouter;
