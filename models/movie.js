const mongoose = require('mongoose');
const { regexUrl } = require('../utils/constatnts');

const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (url) => regexUrl.test(url),
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (url) => regexUrl.test(url),
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (url) => regexUrl.test(url),
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('movie', movieSchema);
