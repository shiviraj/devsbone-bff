const apiAdapter = require('../API/utils/apiAdapter')
const { BACKEND_URL } = require('../config')

const API = apiAdapter(BACKEND_URL || 'http://localhost:8080')
const BASE_PATH = `${BACKEND_URL}/comments`

const CommentService = {
  getAllComments(postId) {
    return API.get(`${BASE_PATH}/${postId}`)
  },
  addComment(postId, comment) {
    return API.post(`${BASE_PATH}/${postId}`, comment)
  }
}

module.exports = CommentService
