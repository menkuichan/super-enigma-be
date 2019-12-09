const express = require('express');
const { getPages } = require('./controllers/get');
const { PORT, HOST } = require('./constants');

const app = express();
app.get('/', (req, res) => {
  getPages(req, res);
}).listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
