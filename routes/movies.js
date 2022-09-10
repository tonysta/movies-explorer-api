const moviesRouter = require('express').Router();

const { getSavedMovies, saveMovie, deleteSavedMovie } = require('../controllers/movies');

moviesRouter.get('/', getSavedMovies);
moviesRouter.post('/', saveMovie);
moviesRouter.delete('/:movieId', deleteSavedMovie);

module.exports = moviesRouter;
