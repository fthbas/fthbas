<template>
  <q-layout class="custom-bg" key="main-layout" :style="{
    'padding': getPadding,
    'background-image': 'url(bg.svg)'}
">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',

  data () {
    return {
    }
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
.q-card {
  border-radius: 10px;
}
.custom-bg {
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
