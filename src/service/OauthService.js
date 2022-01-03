const apiAdapter = require('../API/utils/apiAdapter')
const {BACKEND_URL} = require('../config')

const API = apiAdapter(BACKEND_URL)
const BASE_PATH = `${BACKEND_URL}/oauth`

const OauthService = {
  getClientId() {
    return API.get(`${BASE_PATH}/client-id`)
  },
  signIn(payload) {
    return API.post(`${BASE_PATH}/sign-in/code`, payload)
  }
}

module.exports = OauthService
