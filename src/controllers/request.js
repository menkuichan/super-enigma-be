const { Request } = require('../schemes');
const { Movie } = require('../schemes');
const { DATA_SOURCE } = require('../config');
const { MIN_UPDATE_TIME } = require('../constants');

const findLastSuccessRequest = () => Request.find({ status: 1 }).sort({ date: -1 }).limit(1);

const createSyncRequest = (status) => {
  Request.create(new Request({
    date: new Date(),
    status,
  }));
};

const checkDbEmptiness = () => Movie.findOne({ });

const sendDataSyncRequest = async ({ serverStartDate }) => {
  createSyncRequest(0);
  const request = await findLastSuccessRequest();
  const lastRequest = request.map(res => res.date)[0];
  const result = await checkDbEmptiness();
  if (serverStartDate - lastRequest > MIN_UPDATE_TIME || !result) {
    DATA_SOURCE.map(async source => {
      createSyncRequest(1);
      await source.getData();
    });
  }
};

module.exports = { sendDataSyncRequest };
