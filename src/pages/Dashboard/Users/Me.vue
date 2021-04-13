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
            <q-space />
          </q-toolbar>
        </q-page-sticky>
      </div>
    </div>
    <div class="q-px-md">
      <div class="col-12">
        <q-card>
          <q-card-section class="text-grey-8">
            <div class="row">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="text-h6">{{ $t('userProfile.editProfile') }}</div>
                <span v-if="user && (saving)" class="text-grey-8"><q-icon size="sm" name="las la-spinner la-spin"></q-icon> {{ $t('common.pleaseWait') }}</span>
                <span v-else-if="user" class="text-subtitle2">{{user.first_name}} {{user.last_name}}</span>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section v-if="user">
            <div class="col-12">
              <div class="row">
                <div class="col-md-6 col-sm-12 col-xs-12 q-pr-sm">
                  <q-input @change="saveMe" outlined clearable v-model="user.first_name" :label="$t('inputs.firstName')"></q-input>
                  <q-input @change="saveMe" class="q-pt-md" outlined clearable v-model="user.last_name" :label="$t('inputs.lastName')"></q-input>
                  <q-input @change="saveMe" class="q-pt-md" outlined clearable v-model="user.email" :label="$t('inputs.email')"></q-input>
                  <q-select @input="saveMe" class="q-pt-md"  outlined v-model="user.gender" map-options emit-value :options="[{label:$t('common.genders.m'), value:'m'}, {label:$t('common.genders.f'), value:'f'}, {label:$t('common.genders.u'), value:'u'}]" :label="$t('inputs.gender')" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input type="password" outlined clearable v-model="user.old_password" :label="$t('inputs.oldPassword')"></q-input>
                  <q-input type="password" class="q-pt-md" outlined clearable v-model="user.password" :label="$t('inputs.password')"></q-input>
                  <q-input type="password" class="q-pt-md" outlined clearable v-model="user.password_confirmation" :label="$t('inputs.passwordConfirmation')"></q-input>
                  <q-btn color="green-8" @click="saveMe" class="q-mt-md q-btn--no-uppercase" unelevated outline :label="$t('buttons.savePassword')"></q-btn>
                  <q-item-label class="q-pt-md text-primary" >{{ $t('userProfile.passwordLeaveBlank') }}</q-item-label>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfile',
  meta () {
    return {
      title: this.$t('pageTitles.users.me'),
      titleTemplate: title => `${title} `
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  computed: {
    user () {
      return this.$store.state.users.user
    },
    saving () {
      return this.$store.state.users.saving
    }
  },
  methods: {
    saveMe () {
      this.$store.dispatch('users/saveMe')
    }
  }
}
</script>
<style lang="css">
</style>
