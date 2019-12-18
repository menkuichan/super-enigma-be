const axios = require('axios');
const { PARAMS, MAX_TOTAL_PAGES } = require('../constants.js');

const getMoviesWithoutGenres = async ({ searchQuery, page, url }) => {
  const { data: { results, total_pages: originalTotalPages } } = await axios.get(
    url,
    {
      params: {
        api_key: PARAMS.API_KEY,
        query: searchQuery,
        page,
      },
    },
  );
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
};

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

const getAllGenres = async () => {
  const res = await axios.get(
    PARAMS.GENRES_URL,
    {
      params: { api_key: PARAMS.API_KEY },
    },
  );
  const { genres } = res.data;
  return genres;
};

const getMovies = async ({
  searchQuery, url, page,
}) => {
  const genres = await getAllGenres();
  const { movies, totalPages } = await getMoviesWithoutGenres({ searchQuery, page, url });
  return { totalPages,
    movies: movies.map(movie => getMovieWithGenres(movie, genres)),
    genres };
};

module.exports = { getMovies };
