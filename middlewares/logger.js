const winston = require('winston');
const expressWinston = require('express-winston');
const { NAME_REQUEST_LOG, NAME_ERROR_LOG } = require('../utils/constants');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: NAME_REQUEST_LOG }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: NAME_ERROR_LOG }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
