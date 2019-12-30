const mongoose = require('mongoose');
const { getMoviesFromTMDb } = require('./api/movies');
const { PARAMS } = require('./constants');
const { DB_URI } = require('./config');
const { Movie } = require('./schemes');

mongoose.connect(DB_URI, { useNewUrlParser: true, useFindAndModify: false });

exports.getMovies = async ({ query, url, page }) => {
  const fullUrl = query ? PARAMS.SEARCH_URL : `${PARAMS.URL}${url}`;
  try {
    const { movies, totalPages, genres } = await getMoviesFromTMDb({ query, url: fullUrl, page });
    const allMovie = await Promise.all(movies.map(async movie => {
      const { title, releaseDate } = movie;
      try {
        const result = await Movie.findOne({ title, releaseDate });

        if (!result) {
          return await this.createMovie(movie);
        }
        return movie;
      } catch (e) {
        console.log(e);
      }
    }));
    return { movies: allMovie, totalPages, genres };
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
