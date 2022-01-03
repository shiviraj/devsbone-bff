const apiAdapter = require('../API/utils/apiAdapter')
const {BACKEND_URL} = require('../config')

const API = apiAdapter(BACKEND_URL || 'http://localhost:8080')
const BASE_PATH = `${BACKEND_URL}/pages`

const PageService = {
  addNewPage() {
    return API.post(BASE_PATH)
  },
  getPage(pageId) {
    return API.get(`${BASE_PATH}/${pageId}`)
  },
  updatePage(pageId, body) {
    return API.put(`${BASE_PATH}/${pageId}`, body)
  }
}

module.exports = PageService
