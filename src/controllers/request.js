const { Request } = require('../schemes');
const { DATA_SOURCE } = require('../config');
const { MIN_UPDATE_TIME } = require('../constants');

const findLastSuccessRequest = () => Request.find({ status: 1 }).sort({ date: -1 }).limit(1);

const createSyncRequest = (status) => {
  Request.create(new Request({
    date: new Date(),
    status,
  }));
};

exports.sendDataSyncRequest = async ({ serverStartDate }) => {
  createSyncRequest(0);
  const request = await findLastSuccessRequest();
  const lastRequest = request.map(res => res.date)[0];
  if (serverStartDate - lastRequest > MIN_UPDATE_TIME) {
    DATA_SOURCE.map(async source => {
      createSyncRequest(1);
      source.getData();
    });
  }
};
