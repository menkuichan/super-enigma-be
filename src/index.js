const { MongoClient } = require('mongodb');
const assert = require('assert');
const express = require('express');
// const { getPages } = require('./controllers/get');
const { getMovieById, createMovie, getMovies } = require('./controllers/crud');
const { PORT, HOST } = require('./constants');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'ilona';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect((err) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  client.close();
});


const app = express();
app.get('/movies/', getMovies)
app.get('/movies/:movieId', getMovieById)
app.post('/movies/', createMovie)

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
