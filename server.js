const express = require('express');
const axios = require('axios');
const { PORT, HOST, URL, API_KEY } = require('./src/constants.js');

function getTotalPages() {
  return axios.get(URL,
    {
      params: {
        api_key: API_KEY,
        page: 1,
      },
    })
    .then(({ data: { total_pages } }) => total_pages);
}

const app = express();
app.get('/', (req, res) => {
  getTotalPages().then((total_pages) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello World and total pages - ${total_pages}`);
  });
}).listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
