const axios = require('axios')
const httpContext = require('../../utils/httpContext')

const addHeaders = (req) => {
  const headersToPass = httpContext.get('headers')
  req.headers = { ...headersToPass, ...req.headers }
}

const addRequestStartedAtHeader = (req) => {
  req.requestStartedAt = new Date().getTime()
}

const addResponseTimeHeader = (res) => {
  res.config = {
    ...res.config,
    responseTime: new Date().getTime() - res.config.requestStartedAt
  }
}

const apiAdapter = (baseURL) => {
  const api = axios.create({ baseURL })
  
  api.interceptors.request.use((request) => {
    addHeaders(request)
    addRequestStartedAtHeader(request)
    
    return request
  })
  
  api.interceptors.response.use((response) => {
    addResponseTimeHeader(response)
    return response
  })
  
  return api
}

module.exports = apiAdapter
