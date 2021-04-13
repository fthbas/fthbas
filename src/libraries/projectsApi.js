import axios from 'axios'
import https from 'https'
import { Cookies } from 'quasar'

const api = axios.create({
  baseURL: process.env.VUE_APP_PROJECTS_API_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  headers: {
    Accept: 'application/json'
  }
})

export default {
  get (url, params = null) {
    return api.get(url, {
      params,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('bauth')
      }
    })
  },
  post (url, params) {
    return api.post(url, params, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('bauth')
      }
    })
  },
  delete (url) {
    return api.delete(url, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('bauth')
      }
    })
  },
  put (url, params) {
    return api.put(url, params, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('bauth')
      }
    })
  }
}
