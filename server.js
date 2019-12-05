const express = require('express');
const axios = require('axios');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';

function getHelloWorld() {
  axios.get(BASE_URL,
    {
      params: {
        api_key: 'ab7c9fc53125a8e8d9fd23c8704f80e5',
        page: 1,
      },
    })
    .then((res) => {
      const { total_pages } = res.data;
      console.log(`Total pages: ${total_pages}
      Hello word!`);
    });
}

getHelloWorld();

// App
const app = express();
app.get('/', (req, res) => {
  res.send(getHelloWorld());
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
