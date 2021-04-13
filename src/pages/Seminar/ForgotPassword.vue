<template>
  <div v-if="project">
    <f1 :project="project"></f1>
  </div>
</template>

<script>
import F1 from './LoginRegisterTemplates/F1'

export default {
  name: 'Login',
  components: {
    F1
  },
  meta () {
    return {
      title: this.title,
      titleTemplate: title => `${title}`
    }
  },
  data () {
    return {
      loginData: {
        project: location.hostname,
        email: ''
      },
      error: '',
      title: null,
      askEmail: false,
      project: null
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('users/clearErrors')
    next()
  },
  created () {
    const self = this
    this.$store.dispatch('projects/fetchProjectByDomainSecure', { project: location.hostname }).then(res => {
      if (res.favicon) {
        const favicon = document.getElementById('favicon')
        favicon.href = res.favicon
      }
      if (res.login_type.value === 'password') {
        self.project = res
      } else if (['register_enter', 'register_mail', 'register_sms'].includes(res.login_type.value)) {
        if (!res.register_form.use_own_password) {
          self.$router.push({ name: 'live.register', params: { lang: this.$route.params.lang } })
        } else {
          self.project = res
          self.title = res.name
          self.askEmail = true
          if (!res.live_support_enabled) {
            // eslint-disable-next-line
            // window.$_REVECHAT_API.Button.hide()
          }
        }
      } else if (res.login_type.value === 'all') {
        self.$router.push({ name: 'live', params: { lang: this.$route.params.lang } })
      }
    })
  }
}
</script>
