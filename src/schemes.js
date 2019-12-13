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
});

const Movie = mongoose.model('Movie', movieScheme);

module.exports = { Movie };
