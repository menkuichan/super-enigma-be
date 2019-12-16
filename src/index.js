const { MongoClient } = require('mongodb');
const assert = require('assert');
const express = require('express');
const { getMovieById, deleteMovie, getMovies, createMovie, updateMovie } = require('./controllers/crud');
const { PORT, HOST } = require('./constants');

const url = 'mongodb://localhost:27017';

const dbName = 'ilona';

const client = new MongoClient(url);

client.connect((err) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  client.close();
});


const app = express();
app.get('/movies/', getMovies);
app.get('/movies/:movieId', getMovieById);
app.delete('/movies/:id', deleteMovie);
app.post('/movies/', createMovie);
app.put('/movies/:movieId', updateMovie);

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
