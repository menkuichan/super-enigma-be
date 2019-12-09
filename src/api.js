const axios = require('axios');
const { URL, API_KEY } = require('./constants.js');

function getTotalPages() {
  return axios.get(URL,
    {
      params: {
        api_key: API_KEY,
        page: 1,
      },
    })
    .then(({ data: { total_pages } }) => total_pages);
}

module.exports = { getTotalPages };
