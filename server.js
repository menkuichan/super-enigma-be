const http = require('http');
const axios = require('axios');

// Constants
const port = process.env.PORT || 8080;
const hostname = process.env.HOST || '127.0.0.1';
const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';
const API_KEY = 'ab7c9fc53125a8e8d9fd23c8704f80e5';

function getTotalPages() {
  return axios.get(BASE_URL,
    {
      params: {
        api_key: API_KEY,
        page: 1,
      },
    })
    .then(({ data: { total_pages } }) => total_pages);
}

// App
http.createServer((req, res) => {
  getTotalPages().then((total_pages) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello World and total pages - ${total_pages}`);
  });
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
