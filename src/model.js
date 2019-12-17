const mongoose = require('mongoose');
const getMoviesFromApi = require('./api/movies').getMovies;
const { PARAMS } = require('./constants');
const { Movie } = require('./schemes');

const page = 1;

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useFindAndModify: false });

const url = `${PARAMS.URL}popular`;

exports.getMovies = () => getMoviesFromApi({ page, url })
  .then(({ movies }) => movies.map(movie => {
    const {
      title,
      releaseDate,
    } = movie;
    Movie.findOne({ title, releaseDate })
      .then(result => {
        if (!result) {
          this.createMovie(movie);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return movie;
  }))
  .catch(e => {
    console.log(e);
  });

exports.createMovie = (movie) => Movie.create(new Movie(movie))
  .catch(e => console.log('Error while saving movie:', e));

exports.findMovieById = (id) => Movie.findById(id)
  .catch(e => console.log('Error with finding movies: ', e));

exports.updateMovie = (id, body) => Movie.findOneAndUpdate(
  { _id: id },
  body,
)
  .catch(e => {
    console.log('Error with updating movies: ', e);
  });

exports.deleteMovie = (id) => Movie.findOneAndDelete({ _id: id })
  .catch(e => console.log('Error with deletind movies: ', e));
