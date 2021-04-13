import axios from 'axios'
import https from 'https'
import { Cookies } from 'quasar'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  headers: {
    Accept: 'application/json'
  }
})

export default {
  login (loginData) {
    return api.post('login', loginData)
  },
  get (url, params) {
    return api.get(url, {
      params,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('bauth')
      }
    })
  },
  post (url, params = null) {
    return api.post(url, params, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('bauth')
      }
    })
  },
  put (url, params) {
    return api.put(url, params, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('bauth'),
        'x-bilpp-touch-key': localStorage.getItem('__at')
      }
    })
  }
}
