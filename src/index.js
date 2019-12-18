const express = require('express');
const { getMovieById, deleteMovie, getMovies, createMovie, updateMovie } = require('./controllers/movie');
const { PORT, HOST } = require('./constants');

const app = express();
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};
app.use(allowCrossDomain);
app.use(express.json());
app.get('/movies/', getMovies);
app.get('/movies/:movieId', getMovieById);
app.delete('/movies/:id', deleteMovie);
app.post('/movies/', createMovie);
app.put('/movies/:id', updateMovie);

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
