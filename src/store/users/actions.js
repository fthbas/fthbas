import authApi from 'src/libraries/authApi'
import api from 'src/libraries/api'
import { Cookies } from 'quasar'
import { i18n } from '../../boot/i18n'
export async function login ({ dispatch, commit }, loginData) {
  await authApi.login(loginData).then(res => {
    commit('setErrors', null)
    Cookies.set('bauth', res.data.data.access_token, {
      expires: res.data.data.expiration,
      path: '/'
    })
    commit('setUser', res.data.user)
    this.$router.push({ name: 'dashboard' })
  }).catch(err => {
    commit('setErrors', err.response.data.data)
  })
}

export async function fetchUser ({ dispatch, commit }) {
  if (Cookies.has('bauth')) {
    await api.get('me').then(res => {
      if (res.data.data) {
        i18n.locale = res.data.data.attributes.language
        commit('setUser', res.data.data)
      } else {
        dispatch('fetchUser')
      }
    }).catch((err) => {
      if (err.response.status === 403) {
        dispatch('logout')
      }
    })
  } else {
    await this.$router.push({ name: 'login' })
  }
}

export async function saveMe ({ commit, state, dispatch }) {
  commit('setSaving', true)
  await api.put('me', state.user).then(res => {
    commit('setErrors', null)
    dispatch('fetchUser')
    commit('setSaving', false)
    this.$forceUpdate()
  }).catch((err) => {
    commit('setErrors', err.response.data.data)
    commit('setSaving', false)
  })
}

export async function clearErrors ({ dispatch, commit }) {
  commit('setErrors', null)
}

export function logout ({ commit, state }) {
  Cookies.remove('bauth')
  localStorage.removeItem('__at')
  commit('setUser', null)
  window.location.reload()
}
