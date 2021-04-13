<template>
  <div v-if="project">
    <l1 :project="project"></l1>
  </div>
</template>

<script>
import L1 from './LoginRegisterTemplates/L1'

export default {
  name: 'Login',
  components: {
    L1
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
        password: '',
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
        if (!res.register_form.use_common_password && !res.register_form.use_own_password && res.login_type.value !== 'register_sms') {
          self.$router.push({ name: 'live.register', params: { lang: this.$route.params.lang } })
        } else {
          self.project = res
          self.title = res.name[this.$route.params.lang]
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
