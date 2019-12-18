const { findMovieById, deleteMovie, getMovies, createMovie, updateMovie } = require('../model');

exports.getMovieById = async (req, res) => {
  const { movieId } = req.params;
  const movie = await findMovieById(movieId);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(movie);
};

exports.createMovie = async (req, res) => {
  const movie = await createMovie(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(movie);
};

exports.getMovies = async (req, res) => {
  const movies = await getMovies();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(movies);
};

exports.deleteMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await deleteMovie(id);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(movie);
};

exports.updateMovie = async (req, res) => {
  const { params: { id }, body } = req;
  const movie = await updateMovie(id, body);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(movie);
};
