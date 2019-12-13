const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';

const BASE_URL = 'https://api.themoviedb.org/3/';

const MAX_TOTAL_PAGES = 500;

const PARAMS = {
  URL: `${BASE_URL}movie/`,
  SEARCH_URL: `${BASE_URL}search/movie`,
  GENRES_URL: `${BASE_URL}genre/movie/list`,
  API_KEY: 'ab7c9fc53125a8e8d9fd23c8704f80e5',
};


module.exports = { PORT, HOST, PARAMS, MAX_TOTAL_PAGES };
