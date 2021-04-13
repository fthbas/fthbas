<template :key="'registrations'">
  <div v-if="project">
    <r1 :project="project"></r1>
  </div>
</template>

<script>
import R1 from './LoginRegisterTemplates/R1'
export default {
  name: 'Register',
  meta () {
    return {
      title: this.title,
      titleTemplate: title => `${title}`
    }
  },
  components: {
    R1
  },
  data () {
    return {
      project: null,
      title: null,
      error: '',
      success: null,
      registerData: {
        project: null
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('users/clearErrors')
    next()
  },
  computed: {
    errors () {
      return this.$store.state.users.errors
    },
    saving () {
      return this.$store.state.projects.saving
    },
    fetching () {
      return this.$store.state.projects.fetching
    }
  },
  watch: {
    $route () {
      this.$i18n.locale = this.$route.params.lang
    }
  },
  created () {
    const self = this
    this.$store.dispatch('projects/fetchProjectByDomainSecure', { project: location.hostname }).then(res => {
      if (res.favicon) {
        const favicon = document.getElementById('favicon')
        favicon.href = res.favicon
      }
      if (['register_enter', 'register_mail', 'register_sms'].includes(res.login_type.value)) {
        if (!res.live_support_enabled) {
          // eslint-disable-next-line
          // window.$_REVECHAT_API.Button.hide()
        }
        self.project = res
        self.title = res.name[this.$route.params.lang]
        self.registerData.project = res
      } else if (res.login_type.value === 'all') {
        self.$router.push({ name: 'live', params: { lang: this.$route.params.lang } })
      } else if (res.login_type.value === 'password') {
        self.$router.push({ name: 'live.login', params: { lang: this.$route.params.lang } })
      }
    })
  }
}
</script>
<style scoped></style>
