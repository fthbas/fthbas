import Vue from 'vue'
import Vuex from 'vuex'

import users from './users'
import projects from './projects'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    users,
    projects
  },
  strict: false
})
export default function (/* { ssrContext } */) {
  return Store
}
