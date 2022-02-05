const apiAdapter = require('../API/utils/apiAdapter')
const { BACKEND_URL } = require('../config')

const API = apiAdapter(BACKEND_URL || 'http://localhost:8080')
const BASE_PATH = `${BACKEND_URL}/categories`

const CategoryService = {
  getAllCategories() {
    return API.get(BASE_PATH)
  },
  addNewCategory(category) {
    return API.post(BASE_PATH, category)
  },
  getCategories(categories) {
    return API.post(`${BASE_PATH}/categories`, categories)
  },
  getAllPosts({ page, categoryUrl }) {
    return API.get(`${BASE_PATH}/${categoryUrl}/posts/page/${page}`)
  },
  countAllPosts(categoryUrl) {
    return API.get(`${BASE_PATH}/${categoryUrl}/posts/count`)
  }
}

module.exports = CategoryService
