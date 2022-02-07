const { filterSensitiveHeaders, getTimestamp } = require('./utils')
const { HTTP_CODES } = require('../config/httpCodes')
const { isUnauthorized } = require('../utils/errorHandlers')

const getReferenceId = (re) => re.headers['x-reference-id']

const getErrorAttributes = (err) => ({
  message: err.response && err.response.data && err.response.data.message || err.message,
  responseCode: err.response && err.response.status,
  stackTrace: err.stack
})

const error = (err = {}, message = '', { referenceId = '', details = {} } = {}) => {
  try {
    const timestamp = getTimestamp()
    console.log(JSON.stringify({
      timestamp,
      level: 'ERROR',
      details: {
        referenceId,
        message,
        ...details,
        error: getErrorAttributes(err)
      }
    }))
  } catch (newError) {
    err(newError, 'Error while logging ERROR log', { referenceId, details })
  }
}

const info = (message = '', { referenceId = '', details = {} } = {}) => {
  const timestamp = getTimestamp()
  try {
    console.log(JSON.stringify({
      timestamp,
      level: 'INFO',
      details: { referenceId, message, ...details }
    }))
  } catch (err) {
    error(err, 'Error while logging INFO log', { referenceId, details })
  }
}


const logAPIError = (request, errorResponse, customError, additionalDetails) => {
  const referenceId = getReferenceId(request)
  
  const statusCode = errorResponse.response && errorResponse.response.status ||
    customError.statusCode ||
    HTTP_CODES.INTERNAL_SERVER_ERROR
  const isTechnicalError = statusCode === HTTP_CODES.BAD_REQUEST || statusCode >= 500
  
  const details = { customError, ...additionalDetails }
  
  if (isUnauthorized(errorResponse) || !isTechnicalError) {
    info(customError.message, {
      referenceId,
      details: { ...details, error: getErrorAttributes(errorResponse) }
    })
    return
  }
  
  error(errorResponse, customError.message, { referenceId, details })
}

const requestInfo = (request) => {
  const referenceId = request.headers['x-reference-id']
  
  try {
    const timestamp = getTimestamp()
    const headers = filterSensitiveHeaders(request.headers)
    
    console.log(JSON.stringify({
      timestamp,
      level: 'INFO',
      details: {
        referenceId,
        message: 'Service Call Request',
        requestMethod: request.method,
        uriWithParams: request.url,
        invocationTime: timestamp,
        requestHeaders: headers
      }
    }))
  } catch (err) {
    error(err, 'Error while logging requestInfo', { referenceId })
  }
}

const responseInfo = (response) => {
  const referenceId = response.config.headers['x-reference-id']
  
  try {
    const timestamp = getTimestamp()
    const requestHeaders = filterSensitiveHeaders(response.config.headers)
    
    console.log(JSON.stringify({
      timestamp,
      level: 'INFO',
      details: {
        referenceId,
        message: 'Service Call Response',
        requestMethod: response.config.method,
        requestHeaders,
        uriWithParams: JSON.stringify(response.config.url),
        invocationTime: timestamp,
        responseCode: response.status,
        responseStatus: response.statusText,
        responseHeaders: response.headers,
        performance: {
          responseTime: response.config.responseTime
        }
      }
    }))
  } catch (err) {
    error(err, 'Error while logging responseInfo', { referenceId })
  }
}

module.exports = {
  logAPIError,
  info,
  error,
  requestInfo,
  responseInfo,
  getReferenceId
}
