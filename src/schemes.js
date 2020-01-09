const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieScheme = new Schema({
  title: String,
  overview: String,
  releaseDate: String,
  genres: [{
    type: String,
  }],
  voteAverage: Number,
  popularity: Number,
  originalLanguage: String,
  voteCount: Number,
  originalTitle: String,
  posterPath: String,
  totalPages: Number,
});

const Movie = mongoose.model('Movie', movieScheme);

const requestSceme = new Schema({
  date: Date,
  status: Boolean,
});

const Request = mongoose.model('Request', requestSceme);

module.exports = { Movie, Request };
