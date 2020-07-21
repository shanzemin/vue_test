import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'

// 请求拦截器
axios.interceptors.request.use(config => {
  // 给每个请求里面添加token信息
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('Authorization')
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    router.replace({
      path: '/login'
    })
    Message({
      message: '验证已失效，请重新登录',
      type: 'error',
      duration: 3000
    })
  }
  return Promise.reject(error.response)
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
