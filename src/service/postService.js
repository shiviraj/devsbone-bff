const apiAdapter = require('../API/utils/apiAdapter')
const { BACKEND_URL } = require('../config')

const API = apiAdapter(BACKEND_URL || 'http://localhost:8080')
const BASE_PATH = `${BACKEND_URL}/posts`

const PostService = {
  addNewPost() {
    return API.post(BASE_PATH)
  },
  getPost(postId) {
    return API.get(`${BASE_PATH}/${postId}`)
  },
  updatePost(postId, body) {
    return API.put(`${BASE_PATH}/${postId}`, body)
  },
  getMyPosts(page, limit) {
    return API.get(`${BASE_PATH}/my-posts/page/${page}/limit/${limit}`)
  },
  getMyPostsCount() {
    return API.get(`${BASE_PATH}/my-posts/count`)
  },
  getPublishedPost(postUrl) {
    return API.get(`${BASE_PATH}/${postUrl}/published`)
  },
  addLikeOrDislike(postId, likeOrDislike) {
    return API.put(`${BASE_PATH}/${postId}/like-or-dislike`, likeOrDislike)
  },
  isUrlAvailable(postId, url) {
    return API.get(`${BASE_PATH}/${postId}/url-available/${url}`)
  },
  getPublishedPosts(page) {
    return API.get(`${BASE_PATH}/page/${page}`)
  },
  getPostsCount() {
    return API.get(`${BASE_PATH}/count`)
  }
}

module.exports = PostService
