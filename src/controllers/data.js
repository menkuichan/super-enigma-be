const { CronJob } = require('cron');
const axios = require('axios');
const { NUMBER_OF_RESULTS_PER_PAGE, MOVIE_OBJECT_PROPERTIES } = require('../constants');
const { generateCronDate } = require('./cron');

const fillEmptyObjectProperties = (obj) => obj.map(
  movie => ({ ...MOVIE_OBJECT_PROPERTIES, ...movie }),
);

const getData = async ({ parameters: { url, apikey, s }, page }) => {
  const { data: { Search, totalResults } } = await axios.get(
    url,
    {
      params: {
        apikey,
        s,
        page,
      },
    },
  );
  const results = Search.map(
    ({
      Title: title, Year: releaseDate, Poster: posterPath,
    }) => ({
      title,
      releaseDate,
      posterPath,
    }),
  );
  const movies = fillEmptyObjectProperties(results);
  const totalPages = Math.ceil(totalResults / NUMBER_OF_RESULTS_PER_PAGE);
  return { movies, totalPages };
};

const apiRequest = async ({ updatingFrequency, parameters, totalPages }) => {
  if (totalPages > 1) {
    await getData({ parameters, page: totalPages });
    await apiRequest({ updatingFrequency, parameters, totalPages: totalPages - 1 });
  }
};

exports.getMoviesFromOMDb = async ({ updatingFrequency, parameters, page }) => {
  const { seconds, minutes, hours, day, month, year } = updatingFrequency;
  new CronJob(generateCronDate({ seconds, minutes, hours, day, month, year }),
    () => getData({ parameters, page }), null, true, 'America/Los_Angeles');
  const { totalPages } = await getData({ parameters, page });
  apiRequest({ updatingFrequency, parameters, totalPages });
  return getData({ parameters, page });
};
