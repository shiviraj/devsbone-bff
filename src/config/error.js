const ResponseCode = {
  SUCCESS: 200,
  ACCEPTED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  NO_CONTENT: 204
}

module.exports = {
  ResponseCode,
  DD600: {errorCode: 'DD-600', errorMessage: 'Failed to add new page'},
}
