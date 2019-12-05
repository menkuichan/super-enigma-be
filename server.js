const http = require('http');
const axios = require('axios');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';
const API_KEY = 'ab7c9fc53125a8e8d9fd23c8704f80e5';

function getHelloWorld() {
  return axios.get(BASE_URL,
    {
      params: {
        api_key: API_KEY,
        page: 1,
      },
    })
    .then((res) => {
      const { total_pages } = res.data;
      return total_pages;
    });
}

// App
http.createServer((req, res) => {
  getHelloWorld().then((total_pages) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello World and total pages - ${total_pages}`);
  });
}).listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
