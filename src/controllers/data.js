const { CronJob } = require('cron');
const axios = require('axios');
const { NUMBER_OF_RESULTS_PER_PAGE, MOVIE_OBJECT_PROPERTIES } = require('../constants');
const { generateCronDate } = require('./cron');

const fillEmptyObjectProperties = (obj) => obj.map(
  movie => ({ ...MOVIE_OBJECT_PROPERTIES, ...movie }),
);

const getData = async ({ parameters }) => {
  const { url, apikey, s } = parameters;
  const { data: { Search, totalResults } } = await axios.get(
    url,
    {
      params: {
        apikey,
        s,
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

exports.getMovies = ({ sourceName, updatingFrequency, parameters }) => {
  const { seconds, minutes, hours, day, month, year } = updatingFrequency;
  new CronJob(generateCronDate({ seconds, minutes, hours, day, month, year }),
    () => getData({ sourceName, updatingFrequency, parameters }), null, true, 'America/Los_Angeles');
  return getData({ sourceName, updatingFrequency, parameters });
};
