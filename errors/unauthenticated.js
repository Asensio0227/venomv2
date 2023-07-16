const { StatusCodes } = require('http-status-codes');
const customApiError = require('./custom-api');

class UnauthenticatedError extends customApiError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
};

module.exports = UnauthenticatedError;