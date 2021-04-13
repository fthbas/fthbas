import projectsApi from 'src/libraries/projectsApi'
import { Loading } from 'quasar'
import db from '../../libraries/db'

export async function fetchProjectByDomain ({ dispatch, commit }, data) {
  commit('setFetching', true)

  return new Promise((resolve, reject) => {
    projectsApi.get('project-by-domain/' + data.project).then(res => {
      if (!res.data.data) {
        commit('setFetching', false)
        commit('setStreamProject', null)
        reject(false)
      } else {
        commit('setFetching', false)
        commit('setStreamProject', res.data.data)
        resolve(res.data.data)
      }
    }).catch(() => {
      commit('setFetching', false)
      commit('setStreamProject', null)
      reject(false)
    })
  })
}

export async function deleteContact ({ dispatch, commit }, data) {
  commit('setFetching', true)
  Loading.show()
  return new Promise((resolve, reject) => {
    projectsApi.post('delete-contact', data).then(res => {
      Loading.hide()
      resolve(true)
    }).catch(() => {
      reject(false)
      Loading.hide()
    })
  })
}

export async function fetchProjectByDomainSecure ({ dispatch, commit }, data) {
  commit('setFetching', true)

  return new Promise((resolve, reject) => {
    projectsApi.get('s-project-by-domain/' + data.project).then(res => {
      if (!res.data.data) {
        commit('setFetching', false)
        reject(false)
      } else {
        commit('setFetching', false)
        commit('setStreamProject', res.data.data)
        resolve(res.data.data)
      }
    }).catch(() => {
      commit('setFetching', false)
      reject(false)
    })
  })
}

export async function passwordRecover ({ dispatch, commit }, data) {
  commit('setFetching', true)

  return new Promise((resolve, reject) => {
    projectsApi.post('password-recover', data).then(res => {
      if (!res.data.data) {
        commit('setFetching', false)
        reject(false)
      } else {
        commit('setFetching', false)
        resolve(true)
      }
    }).catch(() => {
      commit('setFetching', false)
      reject(false)
    })
  })
}

export async function codeLogin ({ dispatch, commit }, data) {
  commit('setFetching', true)
  const sendData = {
    project: data.project,
    phone: data.phone,
    sms_code: data.sms_code
  }
  return new Promise((resolve, reject) => {
    projectsApi.post('project-sms-check', sendData).then(res => {
      if (!res.data.data) {
        commit('setFetching', false)
        commit('setStreamProject', null)
        reject(false)
      } else {
        commit('setFetching', false)
        commit('setStreamProject', res.data.data)
        resolve(res.data.data)
      }
    }).catch(() => {
      commit('setFetching', false)
      commit('setStreamProject', null)
      reject(false)
    })
  })
}

export async function login ({ dispatch, commit }, data) {
  commit('setFetching', true)
  const sendData = {
    project: data.project,
    password: data.password,
    email: data.email || 'e'
  }
  return new Promise((resolve, reject) => {
    projectsApi.post('project-password-check', sendData).then(res => {
      if (!res.data.data) {
        commit('setFetching', false)
        commit('setStreamProject', null)
        reject(false)
      } else {
        commit('setFetching', false)
        commit('setStreamProject', res.data.data)
        resolve(res.data.data)
      }
    }).catch(() => {
      commit('setFetching', false)
      commit('setStreamProject', null)
      reject(false)
    })
  })
}

export async function sendSMSCode ({ dispatch, commit }, data) {
  commit('setFetching', true)
  const sendData = {
    project: data.project,
    phone: data.phone || 0
  }
  return new Promise((resolve, reject) => {
    projectsApi.post('project-send-sms', sendData).then(res => {
      if (!res.data.data) {
        commit('setFetching', false)
        reject(false)
      } else {
        commit('setFetching', false)
        resolve(res.data.data)
      }
    }).catch(() => {
      commit('setFetching', false)
      reject(false)
    })
  })
}

export async function register ({ dispatch, commit }, data) {
  commit('setFetching', true)

  return new Promise((resolve, reject) => {
    projectsApi.post('contact-register', data).then(res => {
      if (!res.data.data) {
        commit('setFetching', false)
        commit('setStreamProject', null)
        reject(false)
      } else {
        setTimeout(function () {
          commit('setFetching', false)
        }, 2000)
        commit('setStreamProject', res.data.data)
        resolve(res.data.data)
      }
    }).catch((e) => {
      commit('setFetching', false)
      commit('setStreamProject', null)
      reject(e.response)
    })
  })
}

export async function loginAsRegistered ({ dispatch, commit }, data) {
  commit('setFetching', true)

  const sendData = {
    project: data.project,
    password: data.password
  }
  return new Promise((resolve, reject) => {
    projectsApi.post('project-password-check-for-registered-user', sendData).then(res => {
      if (!res.data.data) {
        commit('setFetching', false)
        commit('setStreamProject', null)
        reject(false)
      } else {
        commit('setFetching', false)
        commit('setStreamProject', res.data.data.project)
        resolve(res.data.data)
      }
    }).catch(() => {
      commit('setFetching', false)
      commit('setStreamProject', null)
      reject(false)
    })
  })
}

export async function surveySave ({ dispatch, commit }, data) {
  commit('setFetching', true)

  return new Promise((resolve, reject) => {
    projectsApi.post('create-or-update-survey-answer', data).then(res => {
      if (!res.data.data) {
        commit('setFetching', false)
        reject(false)
      } else {
        commit('setFetching', false)
        resolve(res.data.data)
      }
    }).catch(() => {
      commit('setFetching', false)
      reject(false)
    })
  })
}

export async function statusChecked ({ dispatch, commit }, data) {
  commit('setFetching', true)
  return new Promise((resolve, reject) => {
    projectsApi.post('status-check', data).then(res => {
      if (!res.data.data) {
        commit('setFetching', false)
        reject(false)
      } else {
        commit('setFetching', false)
        resolve(res.data.data)
      }
    }).catch(() => {
      commit('setFetching', false)
      reject(false)
    })
  })
}

export async function questionSave ({ dispatch, commit }, data) {
  commit('setFetching', true)

  return new Promise((resolve, reject) => {
    projectsApi.post('create-question', data).then(res => {
      if (!res.data.data) {
        commit('setFetching', false)
        reject(false)
      } else {
        commit('setFetching', false)
        resolve(res.data.data)
      }
    }).catch(() => {
      commit('setFetching', false)
      reject(false)
    })
  })
}

export async function qaSave ({ dispatch, commit }, data) {
  commit('setFetching', true)

  return new Promise((resolve, reject) => {
    projectsApi.post('test-answer', data).then(res => {
      if (!res.data.data) {
        commit('setFetching', false)
        reject(false)
      } else {
        commit('setFetching', false)
        resolve(res.data.data)
      }
    }).catch(() => {
      commit('setFetching', false)
      reject(false)
    })
  })
}

export async function fetchProjectByStats ({ dispatch, commit }, data) {
  commit('setFetching', true)

  return new Promise((resolve, reject) => {
    projectsApi.post('project-for-stats', data).then(res => {
      if (!res.data.data) {
        commit('setProject', null)
        commit('setFetching', false)
        reject(false)
      } else {
        commit('setProject', res.data.data)
        commit('setFetching', false)
        resolve(res.data.data)
      }
    }).catch((err) => {
      console.log(err)
      commit('setProject', null)
      commit('setFetching', false)
      reject(false)
    })
  })
}

export async function fetchProject ({ dispatch, commit }, data) {
  commit('setFetching', true)

  return new Promise((resolve, reject) => {
    projectsApi.get('project/' + data.key).then(res => {
      if (!res.data.data) {
        commit('setProject', null)
        commit('setFetching', false)
        reject(false)
      } else {
        commit('setProject', res.data.data)
        commit('setFetching', false)
        resolve(res.data.data)
      }
    }).catch(() => {
      commit('setProject', null)
      commit('setFetching', false)
      reject(false)
    })
  })
}

export async function clearProject ({ dispatch, commit }, data) {
  commit('setProject', null)
}

export async function clearProjects ({ dispatch, commit }, data) {
  commit('setProjects', null)
}

export async function saveProject ({ dispatch, commit, state }, data) {
  commit('setSaving', true)
  if (data.loading) {
    Loading.show()
  }
  const sendText = JSON.stringify(data)
  const send = JSON.parse(sendText)
  delete send.project._id
  await projectsApi.post('project-update/' + send.key, send.project).then(async res => {
    commit('setSaving', false)
    this.$forceUpdate()
    Loading.hide()
  }).catch(() => {
    Loading.hide()
    commit('setSaving', false)
  })
}

export async function saveProjectToFirebase ({ dispatch, commit, state }, data) {
  commit('setSaving', true)
  if (data.loading) {
    Loading.show()
  }
  const sendText = JSON.stringify(data)
  const send = JSON.parse(sendText)
  delete send.project._id
  await db.ref('projects/' + data.project.firebase).set(data.project).then(async res => {
    commit('setSaving', false)
    this.$forceUpdate()
    Loading.hide()
  }).catch(() => {
    Loading.hide()
    commit('setSaving', false)
  })
}

export async function saveQuestion ({ dispatch, commit, state }, data) {
  commit('setSaving', true)
  const sendText = JSON.stringify(data)
  const send = JSON.parse(sendText)
  delete send.question._id
  await projectsApi.post('update-question', data.question).then(res => {
    commit('setSaving', false)
    this.$forceUpdate()
  }).catch(() => {
    commit('setSaving', false)
  })
}

export async function sendSMS ({ dispatch, commit, state }, data) {
  return new Promise((resolve, reject) => {
    commit('setSaving', true)
    projectsApi.post('send-sms', data).then(res => {
      commit('setSaving', false)
      resolve(res.data.data)
    }).catch(() => {
      reject(false)
      commit('setSaving', false)
    })
  })
}

export async function deleteProject ({ dispatch, commit, state }, data) {
  commit('setSaving', true)
  await projectsApi.post('project-delete', { key: data.key }).then(res => {
    this.$router.push({ name: 'projects' })
    commit('setProject', null)
    commit('setSaving', false)
  }).catch(() => {
    this.$router.push({ name: 'projects' })
    commit('setProject', null)
    commit('setSaving', false)
  })
}

export async function createProject ({ dispatch, commit, state }, data) {
  commit('setSaving', true)
  await projectsApi.post('project-create', data.data).then(async res => {
    commit('setProject', res.data.data)
    commit('setSaving', false)
    await db.ref('projects').push(res.data.data).then(fireresponse => {
      res.data.data.firebase = fireresponse.key
      dispatch('saveProject', { key: res.data.data._id, project: { firebase: fireresponse.key, ...res.data.data } })
      this.$router.push({ name: 'projects.show', params: { key: res.data.data._id } })
    })
  }).catch(() => {
    commit('setProject', null)
    commit('setSaving', false)
  })
}

export async function searchProjects ({ dispatch, commit, state, rootState }, data) {
  commit('setFetching', true)
  await projectsApi.post('project-search', data.data).then(res => {
    if (!res.data.data) {
      commit('setProjects', null)
      commit('setProjectsMeta', { count: 0 })
      commit('setFetching', false)
    } else {
      commit('setProjects', res.data.data)
      commit('setProjectsMeta', res.data.meta)
      commit('setFetching', false)
    }
  }).catch(() => {
    commit('setProjects', null)
    commit('setProjectsMeta', { count: 0 })
    commit('setFetching', false)
  })
}

export async function resetStats ({ dispatch, commit, state }, data) {
  commit('setSaving', true)
  await projectsApi.post('reset-stats', data).then(res => {
    commit('setSaving', false)
    this.$forceUpdate()
  }).catch(() => {
    commit('setSaving', false)
  })
}
