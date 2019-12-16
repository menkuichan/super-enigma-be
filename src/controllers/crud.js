const { findMovieById, deleteMovie, getMovies, createMovie, updateMovie } = require('../db');

exports.getMovieById = (req, res) => {
  const { movieId } = req.params;
  findMovieById(movieId).then(movie => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(movie));
  });
};

exports.createMovie = (req, res) => {
  createMovie(req.body)
    .then(movie => {
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(movie));
    });
};

exports.getMovies = (req, res) => {
  getMovies()
    .then(movies => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(movies));
    });
};

// exports.deleteMovie = (req, res) => {
//   const { movieTitle } = req.params;
//   deleteMovie(movieTitle)
//     .then(movie => {
//       res.statusCode = 201;
//       res.setHeader('Content-Type', 'application/json');
//       res.end(JSON.stringify(movie));
//     });
// };

exports.updateMovie = (req, res) => {
  const { parameters, newParameters } = res.params;
  updateMovie({ parameters }, { newParameters })
    .then(movie => {
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(movie));
    });
};
