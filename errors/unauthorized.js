const { StatusCodes } = require('http-status-codes');
const customApiError = require('./custom-api');

class UnauthorizedError extends customApiError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN;
  }
};

module.exports = UnauthorizedError;