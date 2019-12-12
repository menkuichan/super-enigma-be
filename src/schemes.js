const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieScheme = new Schema({
  title: String,
  overview: String,
  releaseDate: String,
});

const Movie = mongoose.model('Movie', movieScheme);

module.exports = { Movie };
