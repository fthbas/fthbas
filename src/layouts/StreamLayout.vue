<template>
  <q-layout>
    <q-header v-if="stream_project && stream_project.header_enabled" elevated class="bg-white text-grey-8 q-py-xs no-shadow" height-hint="58">
      <q-toolbar :style="{height: $q.screen.gt.sm ? '60px': '50px'}">
        <q-toolbar-title shrink class="text-weight-bold">
          <img height="35" :src="stream_project.header_logo || ''">
        </q-toolbar-title>
        <q-space />
        <div v-if="stream_project && stream_project.embed && stream_project.embed.length > 1">
          <div class="q-gutter-sm row items-center no-wrap" v-if="$route.params.pass">
            <q-btn :key="langKey" v-for="(embed, langKey) in stream_project.embed" :to="{name: $route.name, params: {pass: $route.params.pass, lang: embed.language}}" dense flat color="grey-8"
               :style="{'text-transform':'none', 'font-weight':embed.language === $route.params.lang ? 'bold': 'normal'}">
              {{embed.language.toUpperCase()}}
            </q-btn>
          </div>
          <div class="q-gutter-sm row items-center no-wrap" v-else>
            <q-btn :key="langKey" v-for="(embed, langKey) in stream_project.embed" :to="{name: $route.name, params: {lang: embed.language}}" dense flat color="grey-8"
               :style="{'text-transform':'none','font-weight':embed.language === $route.params.lang ? 'bold': 'normal'}">
              {{embed.language.toUpperCase()}}
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'StreamLayout',

  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.state.users.user
    },
    stream_project () {
      return this.$store.state.projects.stream_project
    }
  },
  methods: {
    getParams (lang) {
      const params = this.$route.params
      params.lang = lang
      console.log(params)
      return params
    }
  },
  created () {
    this.$i18n.locale = this.$route.params.lang
  },
  watch: {
    $route () {
      this.$i18n.locale = this.$route.params.lang
    }
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
