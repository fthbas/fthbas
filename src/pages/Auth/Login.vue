<template>
  <div class="row q-mt-xl custom-bg">
    <div class="col"></div>
    <div class="col col-lg-4 col-md-6 col-sm-9 col-xs-12">
      <q-card>
        <q-card-section>
          <div class="text-h5 text-weight-bolder text-center text-grey-9 q-my-lg">Giriş Yap</div>
        </q-card-section>
        <q-card-section>
          <q-input outlined v-model="loginData.email" label="Eposta" :error-message="(errors && errors.email) ? errors.email[0] : ''" :error="!!(errors && errors.email)" />
          <q-input outlined  class="q-mt-sm" type="password" v-model="loginData.password" label="Şifre" :error-message="(errors && errors.password) ? errors.password[0] : ''" :error="!!(errors && errors.password)" />
          <q-space />
          <p class="text-red-8" v-if="(errors && errors.message)">{{errors.message[0]}}</p>
          <q-btn @click="submit"  class="full-width q-mt-sm q-pa-xs q-btn--no-uppercase"  style="font-size: 20px;" color="green-8"  label="Giriş Yap" />
        </q-card-section>
      </q-card>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  meta () {
    return {
      title: this.$t('pageTitles.login'),
      titleTemplate: title => `${title} `
    }
  },
  data () {
    return {
      loginData: {}
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('users/clearErrors')
    next()
  },
  computed: {
    errors () {
      return this.$store.state.users.errors
    }
  },
  methods: {
    submit () {
      this.$store
        .dispatch('users/login', this.loginData)
    }
  }
}
</script>
<style scoped>
ul.custom {
  list-style: none; /* Remove default bullets */
}
ul.custom li {
  font-size: 16px;
  line-height: 35px;
}
ul.custom li::before {
  content: "\2022";  /* Add content: \2022 is the CSS Code/unicode for a bullet */
  color: orangered; /* Change the color */
  font-weight: bold; /* If you want it to be bold */
  display: inline-block; /* Needed to add space between the bullet and the text */
  width: 1em; /* Also needed for space (tweak if needed) */
  margin-left: -1em; /* Also needed for space (tweak if needed) */
}
</style>
