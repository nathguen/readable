import axios from 'axios'
import guid from 'guid'

const rootUrl = "http://localhost:5001"

axios.defaults.baseURL = rootUrl
axios.defaults.headers = {
  Authorization: 'some-key',
  Accept: 'application/json',
  Content: 'application/json'
}

export function getPosts() {
  return axios.get(`/posts`)
    .then(resp => {
      return resp.data
    })
}

export function getCategories() {
  return axios.get(`/categories`)
    .then(resp => {
      return resp.data.categories
    })
}

export function fetchCategoryPosts(category) {
  return axios.get(`/${category.path}/posts`)
    .then(resp => resp.data)
}

export function updatePost(post) {
  return axios.put(`/posts/${post.id}`, post)
    .then(resp => resp.data)
}

export function createPost(post) {
  const data = Object.assign({}, post, {
    id: guid.raw(),
    timestamp: Date.now()
  })
  return axios.post(`/posts`, data)
    .then(resp => resp.data)
}

export function fetchPostComments(postId) {
  return axios.get(`/posts/${postId}/comments`)
    .then(resp => resp.data)
}

export function submitComment(comment) {
  return axios.post(`/comments`, comment)
    .then(resp => {
      const promise = new Promise((resolve, reject) => {
        window.setTimeout(() => {
          resolve(resp.data)
        }, 1000, resp)
      })
      return promise
    })
}