const express = require('express');
const { getTotalPages } = require('./src/api');
const { PORT, HOST } = require('./src/constants');

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
