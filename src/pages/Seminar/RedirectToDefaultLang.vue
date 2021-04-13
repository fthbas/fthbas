<template>
  <div>
  </div>
</template>
<script>
export default {
  name: 'RedirectToDefaultLang',
  beforeRouteLeave (to, from, next) {
    next()
  },
  created () {
    this.$store.dispatch('projects/fetchProjectByDomainSecure', { project: location.hostname }).then(res => {
      if (res.favicon) {
        const favicon = document.getElementById('favicon')
        favicon.href = res.favicon
      }
      if (!res.live_support_enabled) {
        // eslint-disable-next-line
        // window.$_REVECHAT_API.Button.hide()
      }
      if (res.login_type.value === 'all') {
        this.$router.push({ name: 'live', params: { lang: res.default_language } })
      } else if (res.login_type.value === 'password') {
        this.$router.push({ name: 'live.login', params: { lang: res.default_language } })
      } else if (res.login_type.value === 'register_enter') {
        this.$router.push({ name: 'live.register', params: { lang: res.default_language } })
      } else if (['register_mail', 'register_sms'].includes(res.login_type.value)) {
        if (res.register_form.default_route) {
          this.$router.push({ name: res.register_form.default_route.value, params: { lang: res.default_language } })
        } else {
          this.$router.push({ name: 'live.register', params: { lang: res.default_language } })
        }
      }
    })
  }
}
</script>
