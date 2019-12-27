const { getMoviesFromOMDb } = require('./controllers/data');
const { getData } = require('./api/movies');
const { CRON_EVERY_TIME } = require('./constants');

const DB_URI = 'mongodb://localhost:27017';

const DATA_SOURCE = [{
  sourceName: 'OMDb',
  updatingFrequency: {
    seconds: '0', minutes: '0', hours: '0', day: CRON_EVERY_TIME, month: CRON_EVERY_TIME, year: CRON_EVERY_TIME,
  },
  parameters: {
    url: 'http://www.omdbapi.com/',
    apikey: '6fc09eff',
    s: 'Batman',
  },
  getData({ page }) {
    return getMoviesFromOMDb({
      updatingFrequency: this.updatingFrequency,
      parameters: this.parameters,
      page,
    });
  },
},
{
  sourceName: 'TMDb',
  updatingFrequency: {
    seconds: '0', minutes: '0', hours: '12', day: CRON_EVERY_TIME, month: CRON_EVERY_TIME, year: CRON_EVERY_TIME,
  },
  parameters: {

  },
  getData,
}];

module.exports = { DB_URI, DATA_SOURCE };
