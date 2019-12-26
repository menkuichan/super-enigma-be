const { CronJob } = require('cron');
const { Request } = require('../schemes');
const { getMovies } = require('../model');
const { DATA_SOURCE } = require('../config');
const { generateCronDate } = require('./cron');
const { CRON_PARAMS: { YEAR, MONTH, DAY, HOURS, MINUTES, SECONDS }, MIN_UPDATE_TIME, URL_TYPES } = require('../constants');

const findLastSuccessRequest = () => Request.find({ status: 1 }).sort({ date: -1 }).limit(1);

const createSyncRequest = (status) => {
  Request.create(new Request({
    date: new Date(),
    status,
  }));
};

new CronJob(generateCronDate({
  seconds: SECONDS, minutes: MINUTES, hours: HOURS, day: DAY, month: MONTH, year: YEAR,
}), this.sendRequest, null, true, 'America/Los_Angeles');

const apiRequest = ({ url, totalPages }) => {
  if (totalPages > 1) {
    getMovies({ url, page: totalPages });
    apiRequest({ url, totalPages: totalPages - 1 });
  }
};

exports.sendDataSyncRequest = async ({ serverStartDate }) => {
  createSyncRequest(0);
  const request = await findLastSuccessRequest();
  const lastRequest = request.map(res => res.date)[0];
  if (serverStartDate - lastRequest > MIN_UPDATE_TIME) {
    DATA_SOURCE.map(async source => {
      createSyncRequest(1);
      if (source.sourceName === 'TMDb') {
        URL_TYPES.map(async (type) => {
          const { totalPages } = await getMovies({ url: type, page: 1 });
          apiRequest({ url: type, totalPages });
        });
      } else {
        const { totalPages } = await source.getData();
        console.log(totalPages);
      }
    });
  }
};
