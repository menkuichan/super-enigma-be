const axios = require('axios');
const { PARAMS, MAX_TOTAL_PAGES, URL_TYPES } = require('../constants.js');

const getMoviesWithoutGenres = async ({ query, page, url }) => {
  const { data: { results, total_pages: originalTotalPages } } = await axios.get(
    url,
    {
      params: {
        api_key: PARAMS.API_KEY,
        query,
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
  return { movies, totalPages };
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

exports.getMovies = async ({
  query, url, page,
}) => {
  const genres = await getAllGenres();
  const { movies, totalPages } = await getMoviesWithoutGenres({ query, page, url });
  const moviesResult = movies.map(movie => getMovieWithGenres(movie, genres));
  return { movies: moviesResult, totalPages, genres };
};

const apiRequest = ({ url, totalPages }) => {
  if (totalPages > 1) {
    this.getMovies({ url, page: totalPages });
    this.apiRequest({ url, totalPages: totalPages - 1 });
  }
};

exports.getData = () => {
  URL_TYPES.map(async (type) => {
    const { totalPages } = await this.getMovies({ url: type, page: 1 });
    apiRequest({ url: type, totalPages });
  });
};
