import axios from 'axios'
import https from 'https'
import { Cookies } from 'quasar'

const authApi = axios.create({
  baseURL: process.env.VUE_APP_AUTH_API_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  headers: {
    Accept: 'application/json'
  }
})

export default {
  login (loginData) {
    return authApi.post('login', loginData)
  },
  register (registerData) {
    return authApi.post('register', registerData)
  },
  get (url, params) {
    return authApi.get(url, {
      params,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('bauth')
      }
    })
  }
}
