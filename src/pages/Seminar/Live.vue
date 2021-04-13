<template>
  <div>
    <div v-if="allow">

      <stream
        v-if="stream_project && stream_project.stream_settings && stream_project.stream_settings.layout.value === 1"
        :first_name="userData.first_name" :last_name="userData.last_name" :email="userData.email" :phone="userData.phone"
      ></stream>

      <pro
        v-else-if="stream_project && stream_project.stream_settings && stream_project.stream_settings.layout.value === 2"
        :first_name="userData.first_name" :last_name="userData.last_name" :email="userData.email" :phone="userData.phone"
      ></pro>

      <stream
        v-else
        :first_name="userData.first_name" :last_name="userData.last_name" :email="userData.email" :phone="userData.phone"
      ></stream>

    </div>
    <div class="row flex flex-center justify-center q-pa-xl" v-else-if="allow === null">
      <h5>
      {{$t('common.loading') }}
      </h5>
    </div>
    <div v-else>
      <div class="row flex flex-center justify-center q-pa-xl">
        <h3>
          {{$t('common.invalidOrOpen')}}
        </h3>
      </div>
    </div>
  </div>
</template>
<script>
import Stream from 'pages/Seminar/Stream'
import Pro from './Pro/App'
export default {
  components: { Pro, Stream },
  name: 'Live',
  data () {
    return {
      allow: null,
      userData: {
        first_name: null,
        last_name: null,
        email: null,
        password: null
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$socket.client.emit('leave', {
      vid: localStorage.getItem('vid'),
      project: location.hostname,
      pass: this.$route.params.pass || null
    })
    next()
  },
  methods: {
    fetchProjectByDomain (res) {
      this.$store.dispatch('projects/fetchProjectByDomain', { project: location.hostname }).then(resp => {
        window.firebase_id = res.firebase
        localStorage.setItem('__fiba', res.firebase)
        this.allow = true
        this.$socket.client.emit('join', {
          vid: localStorage.getItem('vid'),
          project: location.hostname,
          pass: null
        })
      }).catch(() => {
        this.allow = false
      })
    },
    fetchProjectByCommonLogin () {
      this.$store.dispatch('projects/login', { project: location.hostname, password: this.$route.params.pass }).then(response => {
        if (this.$route.params.pass.toString() === response.password.toString()) {
          this.allow = true
          this.$socket.client.emit('join', {
            vid: localStorage.getItem('vid'),
            project: location.hostname,
            pass: this.$route.params.pass
          })
        } else {
          this.allow = false
        }
      }).catch(() => {
        this.allow = false
      })
    },
    fetchProjectByRegisteredLogin () {
      this.$store.dispatch('projects/loginAsRegistered', { project: location.hostname, password: this.$route.params.pass }).then(response => {
        if (this.$route.params.pass === response.__hash) {
          this.allow = true
          this.userData = {
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email,
            phone: response.phone
          }
          this.$socket.client.emit('join', {
            vid: localStorage.getItem('vid'),
            project: location.hostname,
            pass: this.$route.params.pass
          })
        } else {
          this.allow = false
        }
      }).catch(() => {
        this.allow = false
      })
    },
    decide (res) {
      const type = this.$route.meta.type
      if (type === 'all') {
        if (res.login_type.value === 'all') {
          this.fetchProjectByDomain(res)
        } else {
          this.$router.push({ name: 'redirect' })
        }
      } else if (type === 'password') {
        if (res.login_type.value === 'password' && !res.register_form.use_common_password) {
          this.fetchProjectByCommonLogin(res)
        } else {
          this.$router.push({ name: 'redirect' })
        }
      } else if (type === 'registered') {
        if (['register_enter', 'register_mail', 'register_sms'].includes(res.login_type.value)) {
          this.fetchProjectByRegisteredLogin(res)
        } else if (res.login_type.value === 'password' && res.register_form.use_common_password) {
          this.fetchProjectByRegisteredLogin(res)
        } else {
          this.$router.push({ name: 'redirect' })
        }
      } else {
        this.allow = false
      }
    }
  },
  created () {
    const self = this
    this.$store.dispatch('projects/fetchProjectByDomainSecure', { project: location.hostname }).then(res => {
      if (res.favicon) {
        const favicon = document.getElementById('favicon')
        favicon.href = res.favicon
      }
      self.decide(res)
    }).catch(() => {
      self.allow = false
    })
  },
  computed: {
    stream_project () {
      return this.$store.state.projects.stream_project
    },
    errors () {
      return this.$store.state.users.errors
    }
  }
}
</script>
