<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'Seminar',

  data () {
    return {
    }
  },

  methods: {

  },
  computed: {
    user () {
      return this.$store.state.users.user
    }
  },

  created () {
    this.$i18n.locale = this.$route.params.lang
  }
}
</script>
<style>

</style>
