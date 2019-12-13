const axios = require('axios');
const { PARAMS, MAX_TOTAL_PAGES } = require('../constants.js');

const getMoviesWithoutGenres = ({ searchQuery, page, url }) => axios.get(
  url,
  {
    params: {
      api_key: PARAMS.API_KEY,
      query: searchQuery,
      page,
    },
  },
)
  .then((res => {
    const { results } = res.data;
    const { total_pages: originalTotalPages } = res.data;
    const totalPages = Math.min(originalTotalPages, MAX_TOTAL_PAGES);
    const movies = results.map(
      ({
        title, genre_ids: genresIds, vote_average: voteAverage, overview, poster_path: posterPath,
        release_date: releaseDate, popularity,
        original_language: originalLanguage, vote_count: voteCount, original_title: originalTitle,
      }) => ({
        title,
        genresIds,
        voteAverage,
        overview,
        popularity,
        originalLanguage,
        voteCount,
        originalTitle,
        releaseDate,
        posterPath,
      }),
    );
    return { totalPages, movies };
  }));

const getMovieWithGenres = (movie, genres) => {
  const { genresIds } = movie;
  const genreNames = genres
    .filter(({ id }) => genresIds.includes(id))
    .map(({ name }) => name);
  return {
    ...movie,
    genres: genreNames,
  };
};

const getAllGenres = () => axios.get(
  PARAMS.GENRES_URL,
  {
    params: { api_key: PARAMS.API_KEY },
  },
)
  .then(res => {
    const { genres } = res.data;
    return genres;
  });

const getMovies = ({
  searchQuery, url, page,
}) => getAllGenres()
  .then(genres => getMoviesWithoutGenres({ searchQuery, page, url })
    .then(({ movies, totalPages }) => ({
      totalPages,
      movies: movies.map(movie => getMovieWithGenres(movie, genres)),
      genres,
    })));

module.exports = { getMovies };
