const mongoose = require('mongoose');
const getMoviesFromApi = require('./api/movies').getMovies;
const { PARAMS } = require('./constants');
const { DB_URI } = require('./config');
const { Movie } = require('./schemes');

const page = 1;

mongoose.connect(DB_URI, { useNewUrlParser: true, useFindAndModify: false });

const url = `${PARAMS.URL}popular`;

exports.getMovies = async () => {
  try {
    const { movies } = await getMoviesFromApi({ page, url });
    return await Promise.all(movies.map(async movie => {
      const { title, releaseDate } = movie;
      try {
        const result = await Movie.findOne({ title, releaseDate });

        if (!result) {
          return await this.createMovie(movie);
        }
        return movie;
      } catch (e) {
        console.log(e);
        return movie;
      }
    }));
  } catch (e) {
    console.log(e);
  }
};

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
