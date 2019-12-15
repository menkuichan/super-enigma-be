const { findMovieById, createMovie, getMovies } = require('../db')

exports.getMovieById = (req, res) => {
    const { movieId } = req.params;
    findMovieById(movieId).then(movie => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(movie);
    });
}

exports.createMovie = (req, res) => {
    createMovie(req.body)
        .then(movie => {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(movie);
        })
}

exports.getMovies = (req, res) => {
    getMovies()
        .then(movies => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(movies);
        })
}