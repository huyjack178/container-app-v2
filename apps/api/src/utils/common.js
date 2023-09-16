const moment = require('moment');

const buildContainerFolder = ({ date, opt, userName, fileId }) => {
  return `${moment(date).format('MM')}/${moment(date).format(
    'YYYYMMDD'
  )}/${opt}/${userName.toUpperCase()}/${fileId}`;
};

module.exports = {
  buildContainerFolder,
};
