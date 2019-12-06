const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';
const URL = 'https://api.themoviedb.org/3/movie/popular';
const API_KEY = 'ab7c9fc53125a8e8d9fd23c8704f80e5';

module.exports = { PORT, HOST, URL, API_KEY };
