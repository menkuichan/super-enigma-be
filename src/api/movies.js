const axios = require('axios');
const { API_KEY, MAX_TOTAL_PAGES } = require('../constants.js');

const getReleaseDate = (releaseDate) => {
  if (releaseDate) {
    return releaseDate.replace(/-/g, '.');
  }
  return 'No release date';
};

const getMovies = ({ page, URL }) => axios.get(
  URL,
  {
    params: {
      api_key: API_KEY,
      page,
    },
  },
)
  .then((res => {
    const { results } = res.data;
    const { total_pages: originalTotalPages } = res.data;
    const totalPages = Math.min(originalTotalPages, MAX_TOTAL_PAGES);
    const movies = results.map(
      ({ title, overview, release_date: releaseDate,
      }) => ({ title, overview, releaseDate: getReleaseDate(releaseDate) }),
    );
    return { totalPages, movies };
  }));

module.exports = { getMovies };
