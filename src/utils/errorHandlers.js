const { CUSTOM_ERRORS } = require('../config/customErrorCodes')
const { HTTP_CODES } = require('../config/httpCodes')

const getErrorResponse = (error) => {
  const { statusCode, message, additionalInfo } = error
  return { statusCode, message, ...additionalInfo && { additionalInfo } }
}

const isUnauthorized = (error) => error.response && error.response.status === HTTP_CODES.UNAUTHORIZED
const isBadRequest = (error) => error.response && error.response.status === HTTP_CODES.BAD_REQUEST

const handleError = (error, res, errorDetails) => {
  if (isUnauthorized(error)) {
    res.status(CUSTOM_ERRORS.UNAUTHORIZED.statusCode).send(CUSTOM_ERRORS.UNAUTHORIZED.message)
    return
  }
  
  if (isBadRequest(error)) {
    res.status(HTTP_CODES.BAD_REQUEST).send(getErrorResponse(errorDetails))
    return
  }
  
  if (errorDetails) {
    errorDetails instanceof Array
      ? res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(errorDetails)
      : res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(getErrorResponse(errorDetails))
  } else {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).end()
  }
}

module.exports = { handleError, isUnauthorized }
