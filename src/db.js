const mongoose = require('mongoose');
const { getMovies } = require('./api/movies');
const { URL } = require('./constants');
const { Movie } = require('./schemes');

const page = 1;

mongoose.connect('mongodb://localhost:27017/usersdb', { useNewUrlParser: true });

getMovies({ page, URL })
  .then(({ movies }) => {
    movies.map(movie => {
      const { title, overview, releaseDate } = movie;
      Movie.findOne({ title })
        .then((doc) => doc)
        .then(result => {
          if (result === null) {
            createMovie({ title, overview, releaseDate });
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

function createMovie(parameters) {
  Movie.create(new Movie({ ...parameters }), (e, movie) => {
    if (e) return console.log(e);

    console.log('Saved movie:', movie);
  });
}

function findMovieById(id) {
  Movie.findById(id, (err, movie) => console.log(movie));
}

function updateMovie({ ...parameters }, { ...newParameters }) {
  Movie.updateOne(
    parameters,
    newParameters,
    (e, movie) => {
      console.log('Updated movie: ', movie);
    },
  );
}

function deleteMovie({ ...parameters }) {
  Movie.findOneAndDelete(parameters, (e, movie) => {
    if (e) return console.log(e);
    console.log('Deleted movie ', movie);
  });
}
