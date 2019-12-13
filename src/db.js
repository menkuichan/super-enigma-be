const mongoose = require('mongoose');
const { getMovies } = require('./api/movies');
const { PARAMS } = require('./constants');
const { Movie } = require('./schemes');

const page = 1;

mongoose.connect('mongodb://localhost:27017/usersdb', { useNewUrlParser: true });

const url = `${PARAMS.URL}popular`;

getMovies({ page, url })
  .then(({ movies }) => {
    movies.map(movie => {
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
    });
  })
  .catch(e => {
    console.log(e);
  });

function createMovie({ ...parameters }) {
  Movie.create(new Movie(parameters))
    .then(movie => {
      console.log('Saved movie: ', movie);
    })
    .catch(e => console.log(e));
}

function findMovieById(id) {
  Movie.findById(id)
    .then(movie => console.log(movie))
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
  Movie.findOneAndDelete(parameters)
    .then(movie => console.log('Deleted movie: ', movie))
    .catch(e => console.log('Error with deletind movies: ', e));
}
