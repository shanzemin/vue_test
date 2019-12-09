import axios from 'axios'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 给每个请求里面添加token信息
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('Authorization')
  return config
}, function (error) {
  return Promise.reject(error)
})

export default {
  login (params) {
    return axios.post('/api/users/login', params)
  },
  register (params) {
    return axios.post('/api/users/', params)
  },
  me () {
    return axios.get('/api/users/me')
  },
  checkName (name) {
    return axios.get(`/api/users/checkName?name=${name}`)
  }
}
