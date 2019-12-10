const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const assert = require('assert');
const express = require('express');
const { getPages } = require('./controllers/get');
const { PORT, HOST } = require('./constants');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'ilona';

// Create a new MongoClient
const client = new MongoClient(url);

const { Schema } = mongoose;

// Use connect method to connect to the Server
client.connect((err) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  client.close();
});

const movieScheme = new Schema({
  title: String,
  overview: String,
});

mongoose.connect('mongodb://localhost:27017/usersdb', { useNewUrlParser: true });

const Movie = mongoose.model('Movie', movieScheme);

const movie = new Movie({
  title: 'Fight Club',
  overview: 'Best movie',
});

Movie.create(movie, (err, doc) => {
  mongoose.disconnect();
  if (err) return console.log(err);

  console.log('Сохранен объект user', doc);
});

const app = express();
app.get('/', (req, res) => {
  getPages(req, res);
}).listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
