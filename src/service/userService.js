const apiAdapter = require('../API/utils/apiAdapter')
const { BACKEND_URL } = require('../config')

const API = apiAdapter(BACKEND_URL || 'http://localhost:8080')
const BASE_PATH = `${BACKEND_URL}/users`

const UserService = {
  validate() {
    return API.get(`${BASE_PATH}/me`)
  },
  register(payload) {
    return API.post(`${BASE_PATH}`, payload)
  },
  logout() {
    return API.get(`${BASE_PATH}/logout`)
  },
  getUser(userId) {
    return API.get(`${BASE_PATH}/${userId}`)
  }
}

module.exports = UserService
