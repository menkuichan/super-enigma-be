const axios = require('axios');
const { API_KEY, MAX_TOTAL_PAGES } = require('../constants.js');

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
      ({ title, overview,
      }) => ({ title, overview }),
    );
    return { totalPages, movies };
  }));

module.exports = { getMovies };
