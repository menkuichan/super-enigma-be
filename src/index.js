const { MongoClient } = require('mongodb');
const assert = require('assert');
const express = require('express');
const { getPages } = require('./controllers/get');
const { PORT, HOST } = require('./constants');
require('./db');

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
