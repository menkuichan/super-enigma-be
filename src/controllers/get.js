const { getTotalPages } = require('../api/movies');

function getPages(req, res) {
  getTotalPages().then((total_pages) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello World and total pages - ${total_pages}`);
  });
}

module.exports = { getPages };
