const mongoose = require('mongoose');
const getMoviesFromApi = require('./api/movies').getMovies;
const { PARAMS } = require('./constants');
const { Movie } = require('./schemes');

const page = 1;

mongoose.connect('mongodb://localhost:27017/usersdb', { useNewUrlParser: true });

const url = `${PARAMS.URL}popular`;

function getMovies() {
  return getMoviesFromApi({ page, url })
    .then(({ movies }) => movies.map(movie => {
      const {
        title,
        releaseDate,
      } = movie;
      Movie.findOne({ title, releaseDate })
        .then(result => {
          if (!result) {
            createMovie(movie);
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
}

function createMovie({ ...parameters }) {
  return Movie.create(new Movie(parameters))
    .then(movie => console.log(movie))
    .catch(e => console.log('Error while saving movie:', e));
}

function findMovieById(id) {
  return Movie.findById(id)
    .catch(e => console.log('Error with finding movies: ', e));
}

function updateMovie({ ...parameters }, { ...newParameters }) {
  Movie.updateOne(
    parameters,
    newParameters,
  )
    .then(movie => {
      console.log('Updated movie: ', movie);
    })
    .catch(e => {
      console.log('Error with updating movies: ', e);
    });
}

function deleteMovie({ ...parameters }) {
  return Movie.findOneAndDelete(parameters)
    .catch(e => console.log('Error with deletind movies: ', e));
}

module.exports = {
  findMovieById,
  deleteMovie,
  getMovies,
  createMovie,
};
