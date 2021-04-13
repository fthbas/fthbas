<template>
  <div class="q-pa-md">
    <div class="flex flex-center q-gutter-md">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  meta () {
    return {
      title: this.$t('pageTitles.dashboard'),
      titleTemplate: title => `${title} `
    }
  },
  data () {
    return {
      saving: false
    }
  },
  async created () {

  },
  computed: {
    user () {
      return this.$store.state.users.user
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  watch: {
    user (val) {
    }
  }
}
</script>
<style lang="css">

</style>
