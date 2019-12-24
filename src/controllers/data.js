const { CronJob } = require('cron');
const axios = require('axios');
const { generateCronDate } = require('./cron');

exports.getData = async ({ sourceName, updatingFrequency, parameters }) => {
  const { seconds, minutes, hours, day, month, year } = updatingFrequency;
  new CronJob(generateCronDate({ seconds, minutes, hours, day, month, year }),
    this.sendRequest, null, true, 'America/Los_Angeles');
  console.log(sourceName, updatingFrequency, parameters);
};
