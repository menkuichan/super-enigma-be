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

const CRON_MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const CRON_EVERY_TIME = '*';

const CRON_PARAMS = {
  YEAR: CRON_EVERY_TIME,
  MONTH: CRON_EVERY_TIME,
  DAY: CRON_EVERY_TIME,
  HOURS: '0',
  MINUTES: '0',
  SECONDS: '0',
};

const MIN_UPDATE_TIME = 1;

const URL_TYPES = [
  'popular',
  'upcoming',
  'now_playing',
];

module.exports = {
  PORT,
  HOST,
  PARAMS,
  MAX_TOTAL_PAGES,
  CRON_PARAMS,
  CRON_MONTHS,
  MIN_UPDATE_TIME,
  URL_TYPES,
};
