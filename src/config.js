const { getData } = require('./controllers/data');
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
  },
  getData,
},
{
  sourceName: 'TMDb',
  updatingFrequency: {
    seconds: '0', minutes: '0', hours: '12', day: CRON_EVERY_TIME, month: CRON_EVERY_TIME, year: CRON_EVERY_TIME,
  },
}];

module.exports = { DB_URI, DATA_SOURCE };
