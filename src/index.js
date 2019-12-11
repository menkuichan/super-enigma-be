const { MongoClient } = require('mongodb');
const assert = require('assert');
const express = require('express');
const mongoose = require('mongoose');
const { getPages } = require('./controllers/get');
const { PORT, HOST } = require('./constants');

const { getMovies } = require('./api/movies');
const { URL } = require('./constants');

const { Schema } = mongoose;

const page = 1;

const movieScheme = new Schema({
  title: String,
  overview: String,
});

mongoose.connect('mongodb://localhost:27017/usersdb', { useNewUrlParser: true });

const Movie = mongoose.model('Movie', movieScheme);

getMovies({ page, URL })
  .then(({ movies }) => {
    movies.map(movie => {
      const { title, overview } = movie;
      Movie.findOne({ title })
        .then((doc) => doc)
        .then(result => {
          if (result === null) {
            Movie.create(new Movie({ title, overview }), (e, doc) => {
              if (e) return console.log(e);

              console.log('Сохранен объект movie:', doc);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  })
  .catch(e => {
    console.log(e);
  });

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
app.get('/', (req, res) => {
  getPages(req, res);
}).listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
