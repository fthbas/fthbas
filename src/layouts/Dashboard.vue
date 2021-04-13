<template>
  <q-layout class="bg-grey-2" key="main-layout" view="hhh Lpr fFf" v-if="user">
    <q-header class="bg-white text-grey-8 q-py-xs shadow-1" height-hint="58">
      <q-toolbar :style="{height: $q.screen.gt.sm ? '60px': '50px'}">
        <q-btn flat @click="miniMode = !miniMode" round dense :icon="miniMode ? 'chevron_right' : 'chevron_left'" />
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <div v-if="!user">
            <q-icon size="md" name="las la-spinner fa-spin"></q-icon>
          </div>
          <div v-else>
            <q-btn round flat>
              <q-avatar size="35px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
              <q-tooltip>{{ $t("header.myAccount") }}</q-tooltip>
              <q-menu auto-close>
                <q-list dense>
                  <q-item class="GL__menu-link-signed-in">
                    <q-item-section>
                      <div v-html="$t('header.signedInAs', {'email': user.email })"></div>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item :to="{name:'dashboard'}" clickable>
                    <q-item-section>{{ $t('mainMenu.dashboard') }}</q-item-section>
                  </q-item>
                  <q-item :to="{name:'me'}" clickable>
                    <q-item-section>{{ $t('mainMenu.myProfile') }}</q-item-section>
                  </q-item>
                  <q-separator></q-separator>
                  <q-item @click="logout" clickable>
                    <q-item-section>{{ $t('mainMenu.signOut') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniMode"
      :width="200"
      :breakpoint="100"
      bordered
      content-class="bg-white q-py-md shadow-1"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList">
            <q-item active-class="text-primary"  style="color: #616161; font-weight: 400; border-bottom-right-radius: 15px; border-top-right-radius: 15px;" @click="route(menuItem.to)" :key="index" clickable :active="menuItem.to === ($route.name).split('.')[0]" v-ripple>
              <q-tooltip anchor="center right" self="center left"  v-if="miniMode">{{ menuItem.label }}</q-tooltip>
              <q-item-section avatar >
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view  />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      drawer: true,
      miniMode: false
    }
  },
  methods: {
    route (name) {
      this.$router.push({ name })
    },
    logout () {
      this.$store.dispatch('users/logout')
    }
  },
  watch: {
  },
  computed: {
    menuList () {
      return [
        {
          icon: 'las la-tachometer-alt',
          label: this.$t('mainMenu.dashboard'),
          to: 'dashboard',
          separator: false
        },
        {
          icon: 'las la-cubes',
          label: 'Projeler',
          to: 'projects',
          separator: false
        }
      ]
    },
    errors () {
      return this.$store.state.users.errors
    },
    user () {
      return this.$store.state.users.user
    }
  },
  created () {
    // eslint-disable-next-line
    // window.$_REVECHAT_API.Button.hide()
    this.$store.dispatch('users/fetchUser')
  }
}
</script>
<style>
.q-card {
  border-radius: 10px;
}
</style>
