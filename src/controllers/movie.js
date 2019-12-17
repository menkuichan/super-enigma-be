const { findMovieById, deleteMovie, getMovies, createMovie, updateMovie } = require('../model');

exports.getMovieById = (req, res) => {
  const { movieId } = req.params;
  findMovieById(movieId).then(movie => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(movie);
  });
};

exports.createMovie = (req, res) => {
  createMovie(req.body)
    .then(movie => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(movie);
    });
};

exports.getMovies = (req, res) => {
  getMovies()
    .then(movies => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(movies);
    });
};

exports.deleteMovie = (req, res) => {
  const { id } = req.params;
  deleteMovie(id)
    .then(movie => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(movie);
    });
};

exports.updateMovie = (req, res) => {
  const { params: { id }, body } = req;
  updateMovie(id, body)
    .then(movie => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(movie);
    });
};
