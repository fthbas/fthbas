<template>
  <div>
    <div class="q-px-md" style="margin-bottom: 50px;">
      <div class="row q-px-md">
        <q-page-sticky expand position="top" class="q-px-md" style="z-index: 1999;">
          <q-toolbar class="col-12 bg-grey-2" style="height: 50px; min-height: 50px; padding-left: 0;">
            <q-btn align="around" @click="$router.go(-1)" class="btn-fixed-width" color="grey-8" flat icon="la la-arrow-left" >
              <q-tooltip anchor="top middle" transition-show="flip-right" transition-hide="flip-left" self="center middle">
                {{ $t('common.back') }}
              </q-tooltip>
            </q-btn>
            <q-separator vertical ></q-separator>
            <div class="q-px-xs ">
              <q-btn align="around" :to="{name: 'projects.create'}" class="btn-fixed-width q-btn--no-uppercase" flat color="green-8" label="Yeni Proje Oluştur" icon="la la-plus" >
                <q-tooltip anchor="top middle" transition-show="flip-right" transition-hide="flip-left" self="center middle">
                 Yeni Proje Oluştur
                </q-tooltip>
              </q-btn>
            </div>
            <q-space />
          </q-toolbar>
        </q-page-sticky>
      </div>
    </div>
    <div class="q-px-md" >
      <div class="col-12">
        <q-card class="shadow-1">
          <q-card-section class="text-grey-8">
            <div class="row">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="text-h6">Projeler</div>
                <div v-if="user && fetching" class="text-grey-8"><q-icon size="sm" name="las la-spinner la-spin"></q-icon> {{ $t('common.pleaseWait')  }} </div>
                <div v-else class="text-subtitle2">{{projects_meta.count }} Proje Bulundu</div>
              </div>
              <div class="col col-md-6 col-sm-12 col-xs-12">
                <q-input  :style="{width: $q.screen.lt.sm ? '100%' : '400px'}" :class="{'float-right':$q.screen.gt.sm, 'q-pt-sm':$q.screen.lt.md}" @keyup.enter="filterProjects" @clear="filterProjects" outlined clearable v-model="search" label="Projelerde Ara">
                  <template v-slot:after>
                    <q-btn @click="filterProjects" unelevated flat icon="la la-search" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-pt-md row q-col-gutter-md" v-if="user && projects">
        <div v-for="(project, key) in projects" :key="key" class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
          <router-link style="text-decoration: none;" :to="{name: 'projects.show', params: { key: project._id }}" >
            <q-card style="height: 120px;" class="custom-bg shadow-1" :style="{'background-image': 'url(abstract-2.svg)'}">
              <q-card-section class="flex flex-center bg-custom" :style="{ fontSize: '20px', height: '120px', 'min-height': '120px', 'max-height': '120px'}">
                <div class="text-grey-8">{{ typeof project.name === 'string' ? project.name : project.name[project.languages.find(x => x.deletable === false).value] }}</div>
              </q-card-section>
            </q-card>
          </router-link>
        </div>
      </div>
      <div class="q-pa-lg flex flex-center" v-if="user && projects && !fetching">
        <q-pagination
          v-if="user && projects && !fetching"
          v-model="page"
          :max="projects_meta.total_pages"
          :input="true"
          @input="filterProjects"
        >
        </q-pagination>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Projects',
  meta () {
    return {
      title: 'Projeler',
      titleTemplate: title => `${title} `
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('projects/clearProjects')
    next()
  },
  methods: {
    filterProjects () {
      this.$router.push({ name: 'projects', query: { search: this.search || '', page: this.page || this.projects_meta.page } })
      if (this.search && this.search !== '') {
        Promise.all([
          this.$store.dispatch('projects/searchProjects', { data: { search: this.search, _page: this.page, _limit: this.limit } })
        ]).finally(() => {
          this.page = this.projects_meta.page
        })
      } else {
        Promise.all([
          this.$store.dispatch('projects/searchProjects', { data: { search: '', _page: this.page, _limit: this.limit } })
        ]).finally(() => {
          this.page = this.projects_meta.page
        })
      }
    }
  },
  async created () {
    if (this.user) {
      Promise.all([
        this.$store.dispatch('projects/searchProjects', { data: { search: this.search, _page: this.page, _limit: this.limit } })
      ]).finally(() => {
        this.page = this.projects_meta.page
      })
    }
  },
  data () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      filter: '',
      page: parseInt(this.$route.query.page) || 1,
      limit: parseInt(this.$route.query.limit) || 24,
      search: this.$route.query.search || ''
    }
  },
  computed: {
    user () {
      return this.$store.state.users.user
    },
    projects () {
      return this.$store.state.projects.projects
    },
    projects_meta () {
      return this.$store.state.projects.projects_meta
    },
    saving () {
      return this.$store.state.projects.saving
    },
    fetching () {
      return this.$store.state.projects.fetching
    }
  },
  watch: {
    page (val) {
      this.$router.push({ name: 'projects', query: { search: this.search || '', page: val || this.projects_meta.page } })
    }
  }
}
</script>
<style lang="css" scoped>
.custom-bg {
  background-position: right top;
  background-size: 50% auto;
  background-repeat: no-repeat;
}
</style>
