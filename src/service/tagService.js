const apiAdapter = require('../API/utils/apiAdapter')
const { BACKEND_URL } = require('../config')

const API = apiAdapter(BACKEND_URL || 'http://localhost:8080')
const BASE_PATH = `${BACKEND_URL}/tags`

const TagService = {
  addNewTag(tag) {
    return API.post(BASE_PATH, tag)
  },
  getAllTag(tags) {
    return API.post(`${BASE_PATH}/tags`, tags)
  },
  getTagsByTagName(tagName) {
    return API.get(`${BASE_PATH}/${tagName}`)
  }
}

module.exports = TagService
