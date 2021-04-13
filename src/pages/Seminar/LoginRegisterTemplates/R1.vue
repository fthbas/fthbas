<template :key="'registrations'">
  <div v-if="project">
    <div id="main-wrapper" class="oxyy-login-register" v-if="project.register_form" >
      <div class="container-fluid px-0">
        <div class="row no-margin" style="padding:10px; z-index: 9999999 !important;" v-if="project.languages.length > 1">
          <div class="col"></div>
          <div class="col-auto">
            <router-link style="z-index: 9999999 !important;" :key="embkey" v-for="(lang, embkey) in project.languages" :to="{name:$route.name, params : {lang: lang.value }}">
              <q-img style="z-index: 9999999 !important;" width="40px" class="self-end" height="40px" :src="lang.value + '.png'"></q-img>
            </router-link>
          </div>
        </div>
        <div class="row no-gutters min-vh-100" :style="{ 'margin-top': project.languages.length > 1 ? '-60px' : '0', 'z-index': '500 !important'}">
          <!-- Welcome Text
          ========================= -->
          <div class="col-md-6">
            <div class="hero-wrap d-flex align-items-center h-100">
              <div :class="{'hero-mask': !project.login_image,'opacity-8': !project.login_image, 'bg-primary': true}"></div>
              <div class="hero-bg hero-bg-scroll" :style="{'background-image': project.login_image ? 'url('+project.login_image[$route.params.lang]+')' : 'url(login-bg.jpg)'}"></div>
              <div class="hero-content mx-auto w-100 h-100 d-flex flex-column">
                <div class="row no-gutters my-auto" v-if="project.login_show_name_title">
                  <div class="col-10 col-lg-9 mx-auto">
                    <h1 class="text-11 text-white mb-4">{{project.name[$route.params.lang]}}</h1>
                    <p class="text-4 text-white line-height-4 mb-5">{{project.description[$route.params.lang]}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Welcome Text End -->

          <!-- Login Form
          ========================= -->
          <div class="col-md-6 d-flex align-items-center" >
            <div class="container my-auto py-5">
              <div class="row">
                <div class="col-11 col-lg-9 col-xl-8 mx-auto">
                  <h3 class="font-weight-600 q-py-md">{{project.register_settings.translate.registerTitle[$route.params.lang]}}</h3>
                  <q-dialog v-model="errorModal">
                    <q-card class="q-pa-xl">
                      <q-card-section>
                        <div class="text-h6"></div>
                      </q-card-section>
                      <q-card-section class="q-pt-none">
                        {{ error }}
                      </q-card-section>
                      <q-card-actions align="right">
                        <q-btn flat :label="project.register_settings.translate.ok[$route.params.lang]" color="primary" v-close-popup />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                  <q-dialog @show="trigger" v-model="successModal">
                    <q-card class="q-pa-xl">
                      <q-card-section>
                        <div class="text-h6 full-width text-center">
                          <q-icon name="las la-calendar-check" size="90px" color="green-8"></q-icon>
                        </div>
                      </q-card-section>
                      <q-card-section class="q-pt-none text-center">
                        <h6 class="no-margin">{{success}}</h6>
                      </q-card-section>
                      <q-card-section v-if="showLink" class="q-pt-none ">
                        <h6 class="no-margin">{{ project.register_settings.translate.hereYourLink[$route.params.lang] }}</h6>
                        <q-input class="no-padding no-margin" readonly bottom-slots borderless v-model="showLink">
                          <template v-slot:append>
                            <q-icon name="las la-copy" @click="()=>{copyToClipboard(
                              showLink
                              ); $q.notify({
                              message: 'Copied',
                              color: 'green-8',
                              position: 'top'
                            })}" class="cursor-pointer" />
                          </template>
                        </q-input>
                        <a :href="showLink" class="full-width flex flex-center" target="_blank">
                          <q-btn color="yellow-10" class="full-width" :label="project.register_settings.translate.goToLink[$route.params.lang]"></q-btn>
                        </a>
                      </q-card-section>
                      <q-card-section class="flex flex-center">
                        <div title="Add to Calendar" class="addeventatc">
                          Add to Calendar
                          <span class="start">{{ project.start_date ? moment(project.start_date).format('DD/MM/YYYY HH:mm') : moment().format('DD/MM/YYYY HH:mm') }}</span>
                          <span class="end">{{ project.end_date ? moment(project.start_date).format('DD/MM/YYYY HH:mm') : moment().format('DD/MM/YYYY HH:mm') }}</span>
                          <span class="timezone">{{ 'Europe/Istanbul' }}</span>
                          <span class="date_format">DD/MM/YYYY</span>
                          <span class="title">{{ project.name[$route.params.lang] }}</span>
                          <span class="description">{{ project.description[$route.params.lang] || '' }}</span>
                          <span class="location">https://{{ project.domain}}/#/{{$route.params.lang}}</span>
                        </div>
                      </q-card-section>
                      <q-card-actions align="right">
                        <q-btn flat :label="project.register_settings.translate.ok[$route.params.lang]" color="primary" v-close-popup />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                  <div class="form-group" v-for="(question, keytt) in project.register_form.questions" :key="keytt">
                    <label>{{question.question[$route.params.lang]}}</label>
                    <input v-if="question.type === 'string' && !question.meta && !question.pro" type="text" :placeholder="question.placeholder ? question.placeholder[$route.params.lang] : ''" class="form-control" v-model.trim="registerData[question.key]" :required="question.is_required">
                    <input v-if="question.type === 'string' && question.meta && question.meta.contact_field === 'phone'"  :placeholder="question.placeholder ? question.placeholder[$route.params.lang] : ''" class="form-control" v-mask="question.mask ? question.mask[$route.params.lang] : '##############'" v-model.trim="registerData[question.meta.contact_field]" :required="question.is_required">
                    <input v-if="question.type === 'string' && question.meta && question.meta.contact_field === 'password'" :placeholder="question.placeholder ? question.placeholder[$route.params.lang] : ''" type="password"  class="form-control" v-model.trim="registerData[question.meta.contact_field]" :required="question.is_required">
                    <input v-if="question.type === 'string' && question.meta && question.meta.contact_field === 'id_card'" :placeholder="question.placeholder ? question.placeholder[$route.params.lang] : ''" type="number"  class="form-control" v-model.number.trim="registerData[question.meta.contact_field]" :required="question.is_required">
                    <input v-if="question.type === 'string' && question.pro && question.pro.type === 'reg_pass'" :placeholder="question.placeholder ? question.placeholder[$route.params.lang] : ''"  class="form-control" v-model.trim="registerData[question.pro.type]" :required="question.is_required">
                    <input v-if="question.type === 'string' && question.meta && ['id_card', 'password', 'phone'].indexOf(question.meta.contact_field) < 0" type="text" :placeholder="question.placeholder ? question.placeholder[$route.params.lang] : ''"  class="form-control" v-model.trim="registerData[question.meta.contact_field]" :required="question.is_required">
                    <input v-if="question.type === 'number'" type="number"  class="form-control" v-model.number.trim="registerData[question.key]" :placeholder="question.placeholder ? question.placeholder[$route.params.lang] : ''" :required="question.is_required">
                    <select :required="question.is_required" class="form-control" v-if="question.type === 'selectbox'" v-model="registerData[question.key]">
                      <option :value="'undefined'" disabled>{{project.register_settings.translate.pleaseSelect[$route.params.lang]}}</option>
                      <option :key="okey" v-for="(opt, okey)  in question.options" :value="opt.name">{{opt.name[$route.params.lang]}}</option>
                    </select>
                    <div v-if="question.type === 'gender'">
                      <label style="border: 1px solid #dedede;  padding: 8px 16px;" :key="okey" class="q-mr-sm" v-for="(opt, okey)  in question.options">
                        {{opt.name[$route.params.lang]}}
                        <input class="form-control" type="radio" :name="question.meta.contact_field" :value="opt.value" v-model="registerData[question.meta.contact_field]">
                      </label>
                    </div>
                    <div v-if="question.type === 'checkbox'">
                      <label style="border: 1px solid #dedede;  padding: 8px 16px;" :key="okey" class="q-mr-sm" v-for="(opt, okey)  in question.options">
                        {{opt.name[$route.params.lang]}}
                        <input class="form-control" type="checkbox" :name="question.key" :value="opt.name" v-model="registerData[question.key]">
                      </label>
                    </div>
                    <div v-if="question.type === 'radio'">
                      <label style="border: 1px solid #dedede;  padding: 8px 16px;" :key="okey" class="q-mr-sm" v-for="(opt, okey)  in question.options">
                        {{opt.name[$route.params.lang]}}
                        <input class="form-control" type="radio" :name="question.key" :value="opt.name" v-model="registerData[question.key]">
                      </label>
                    </div>
                  </div>
                  <div class="form-group" v-if="!project.gdpr_disabled[$route.params.lang]">
                    <input style="float: left; margin: 5px;" type="checkbox" name="__gdpr_kvkk" :value="1" v-model="registerData['__gdpr_kvkk']">
                    <p @click="kvkk = !kvkk" class="cursor-pointer text-blue-12">{{ project.gdpr_title[$route.params.lang] ? project.gdpr_title[$route.params.lang] : project.register_settings.translate.gdprTitle[$route.params.lang]}}</p>
                  </div>
                  <q-dialog v-model="kvkk" v-if="!project.gdpr_disabled[$route.params.lang]">
                    <q-card class="q-pa-sm" style="width: 1000px; max-width: 80vw;">
                      <q-card-section>
                        <div class="text-h6"></div>
                      </q-card-section>
                      <q-card-section class="q-pa-lg" v-html="project.gdpr_text[$route.params.lang] || ''">
                      </q-card-section>
                      <q-card-actions class="q-pa-xl">
                        <q-btn push :label="project.register_settings.translate.ok[$route.params.lang]" color="blue-8" v-close-popup />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                  <div v-if="errors">
                    <p class="text-red-8" v-for="(err, errKey) in errors" :key="errKey">{{err}}</p>
                  </div>
                  <button :disabled="saving || fetching || submitStatus === 'PENDING'"
                          class="btn btn-primary btn-block my-4"
                          :style="{'cursor':'pointer', 'background-color': project.btn_color ? project.btn_color : '#007bff'}"
                          type="button" @click="submit" >{{ (saving || fetching) ?  project.register_settings.translate.pleaseWait[$route.params.lang] : project.register_settings.translate.save[$route.params.lang] }}</button>
                  <p class="text-center text-muted mb-0" v-if="project.show_login_link_at_register"><router-link class="btn-link" :to="{ name: 'live.login', params: { lang: this.$route.params.lang } }">{{project.register_settings.translate.loginNow[$route.params.lang]}}</router-link></p>
                </div>
              </div>
            </div>
          </div>
          <!-- Login Form End -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as EmailValidator from 'email-validator'
import { copyToClipboard } from 'quasar'
import moment from 'moment'
export default {
  name: 'R1',
  props: ['project'],
  data () {
    return {
      copyToClipboard,
      moment,
      registerData: {
        project: this.project,
        lang: this.$route.params.lang,
        __gdpr_kvkk: false
      },
      errors: [],
      kvkk: false,
      submitStatus: null,
      error: '',
      showLink: null,
      errorModal: false,
      successModal: false,
      success: null
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('users/clearErrors')
    next()
  },
  created () {
    if (this.project.gdpr_disabled[this.$route.params.lang]) {
      this.registerData.__gdpr_kvkk = true
    }
    for (let i = 0; i < this.project.register_form.questions.length; i++) {
      if (this.project.register_form.questions[i].type === 'checkbox') {
        this.registerData[this.project.register_form.questions[i].key] = []
      }
    }
  },
  computed: {
    saving () {
      return this.$store.state.projects.saving
    },
    fetching () {
      return this.$store.state.projects.fetching
    }
  },
  methods: {
    trigger () {
      window.addeventatc.generate()
    },
    validate () {
      let allValid = true
      const errors = []
      for (let i = 0; i < this.project.register_form.questions.length; i++) {
        if (this.project.register_form.questions[i].meta) {
          if (this.project.register_form.questions[i].is_required && !this.registerData[this.project.register_form.questions[i].meta.contact_field]) {
            errors.push(this.project.register_form.questions[i].question[this.$route.params.lang] + ' ' + this.project.register_settings.translate.isRequired[this.$route.params.lang])
            allValid = false
          } else if (this.project.register_form.questions[i].meta.contact_field === 'email') {
            if (!EmailValidator.validate(this.registerData[this.project.register_form.questions[i].meta.contact_field])) {
              errors.push(this.project.register_form.questions[i].question[this.$route.params.lang] + ' ' + this.project.register_settings.translate.mustBeEmail[this.$route.params.lang])
              allValid = false
            }
          } else if (this.project.register_form.questions[i].meta.contact_field === 'id_card') {
            if (this.registerData[this.project.register_form.questions[i].meta.contact_field] < 10000000000 || this.registerData[this.project.register_form.questions[i].meta.contact_field] > 99999999999) {
              errors.push(this.project.register_form.questions[i].question[this.$route.params.lang] + ' ' + this.project.register_settings.translate.mustBe11[this.$route.params.lang])
              allValid = false
            }
          }
        } else if (this.project.register_form.questions[i].pro) {
          if (this.project.register_form.questions[i].is_required && !this.registerData[this.project.register_form.questions[i].pro.type]) {
            errors.push(this.project.register_form.questions[i].question[this.$route.params.lang] + ' ' + this.project.register_settings.translate.isRequired[this.$route.params.lang])
            allValid = false
          }
        } else {
          if (this.project.register_form.questions[i].is_required && !this.registerData[this.project.register_form.questions[i].key]) {
            errors.push(this.project.register_form.questions[i].question[this.$route.params.lang] + ' ' + this.project.register_settings.translate.isRequired[this.$route.params.lang])
            allValid = false
          }
        }
      }
      if (!this.registerData.__gdpr_kvkk) {
        errors.push(this.project.register_settings.translate.mustAcceptGDPR[this.$route.params.lang])
        allValid = false
      }

      this.errors = errors
      return allValid
    },
    snakeCase (string) {
      return string.replace(/\d+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join('_')
    },
    submit () {
      const self = this
      if (this.validate()) {
        this.$store
          .dispatch('projects/register', this.registerData).then(res => {
            if (res.__hash) {
              if (res.project.login_type.value === 'register_enter') {
                this.$router.push({ name: 'live.registered_pass', params: { pass: res.__hash, lang: this.$route.params.lang } })
              } else {
                if (res.project.login_type.value === 'register_mail' && res.project.register_form.use_own_password) {
                  if (res.project.register_form.show_login_link_at_success) {
                    this.showLink = res.__path
                  }
                  this.success = this.project.register_settings.translate.loginWithYourPassword[this.$route.params.lang]
                  this.registerData = {
                    project: this.project,
                    lang: this.$route.params.lang
                  }
                  this.successModal = true
                } else if (res.project.login_type.value === 'register_mail' && res.project.register_form.send_email) {
                  this.success = this.project.register_settings.translate.loginSentEmail[this.$route.params.lang]
                  if (res.project.register_form.show_login_link_at_success) {
                    this.showLink = res.__path
                  }
                  this.registerData = {
                    project: this.project,
                    lang: this.$route.params.lang
                  }
                  this.successModal = true
                } else if (res.project.login_type.value === 'register_sms') {
                  if (res.project.send_sms_after_registration) {
                    setTimeout(function () {
                      window.location.href = self.$router.resolve({ name: 'live.login', params: { lang: self.$route.params.lang }, query: { sms: 'o', phone: self.registerData.phone } }).href
                      // window.open(self.$router.resolve({ name: 'live.login', params: { lang: self.$route.params.lang }, query: { sms: 'o', phone: self.registerData.phone } }).href, '_blank')
                    }, 2000)
                  } else {
                    if (res.project.register_form.show_login_link_at_success) {
                      this.showLink = res.__path
                    }
                    this.success = this.project.register_settings.translate.loginWithYourPhone[this.$route.params.lang]
                    this.registerData = {
                      project: this.project,
                      lang: this.$route.params.lang
                    }
                    this.successModal = true
                  }
                } else if (res.project.login_type.value === 'register_mail' && !res.project.register_form.send_email) {
                  this.success = this.project.register_settings.translate.registerSuccess[this.$route.params.lang]
                  if (res.project.register_form.show_login_link_at_success) {
                    this.showLink = res.__path
                  }
                  this.registerData = {
                    project: this.project,
                    lang: this.$route.params.lang
                  }
                  this.successModal = true
                }
              }
            } else {
              this.error = this.project.register_settings.translate.alreadyRegistered[this.$route.params.lang]
              this.errorModal = true
            }
          }).catch((e) => {
            this.error = this.project.register_settings.translate.anErrorOccured[this.$route.params.lang]
            this.errorModal = true
          })
      }
    }
  }
}
</script>
<style scoped>
/*! CSS Used from: https://oxy.test/vendor/bootstrap/css/bootstrap.min.css */
*,::after,::before{box-sizing:border-box;}
h1,h3{margin-top:0;margin-bottom:.5rem;}
p{margin-top:0;margin-bottom:1rem;}
a{color:#007bff;text-decoration:none;background-color:transparent;}
a:hover{color:#0056b3;text-decoration:underline;}
img{vertical-align:middle;border-style:none;}
label{display:inline-block;margin-bottom:.5rem;}
button{border-radius:0;}
button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color;}
button,input{margin:0;font-family:inherit;font-size:inherit;line-height:inherit;}
button,input{overflow:visible;}
button{text-transform:none;}
[type=submit],button{-webkit-appearance:button;}
[type=submit]::-moz-focus-inner,button::-moz-focus-inner{padding:0;border-style:none;}
input[type=checkbox]{box-sizing:border-box;padding:0;}
h1,h3{margin-bottom:.5rem;font-weight:500;line-height:1.2;}
h1{font-size:2.5rem;}
h3{font-size:1.75rem;}
.container,.container-fluid{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto;}
@media (min-width:576px){
  .container{max-width:540px;}
}
@media (min-width:768px){
  .container{max-width:720px;}
}
@media (min-width:992px){
  .container{max-width:960px;}
}
@media (min-width:1200px){
  .container{max-width:1140px;}
}
.row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px;}
.no-gutters{margin-right:0;margin-left:0;}
.no-gutters>[class*=col-]{padding-right:0;padding-left:0;}
.col-10,.col-11,.col-lg-9,.col-md-6,.col-sm,.col-xl-8{position:relative;width:100%;padding-right:15px;padding-left:15px;}
.col-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%;}
.col-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%;}
@media (min-width:576px){
  .col-sm{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%;}
}
@media (min-width:768px){
  .col-md-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%;}
}
@media (min-width:992px){
  .col-lg-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%;}
}
@media (min-width:1200px){
  .col-xl-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%;}
}
.form-control{display:block;width:100%;height:calc(1.5em + .75rem + 2px);padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;border-radius:.25rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;}
@media (prefers-reduced-motion:reduce){
  .form-control{transition:none;}
}
.form-control::-ms-expand{background-color:transparent;border:0;}
.form-control:-moz-focusring{color:transparent;text-shadow:0 0 0 #495057;}
.form-control:focus{color:#495057;background-color:#fff;outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.25);}
.form-control::-webkit-input-placeholder{color:#6c757d;opacity:1;}
.form-control::-moz-placeholder{color:#6c757d;opacity:1;}
.form-control:-ms-input-placeholder{color:#6c757d;opacity:1;}
.form-control::-ms-input-placeholder{color:#6c757d;opacity:1;}
.form-control::placeholder{color:#6c757d;opacity:1;}
.form-control:disabled{background-color:#e9ecef;opacity:1;}
.form-group{margin-bottom:1rem;}
.form-check{position:relative;display:block;padding-left:1.25rem;}
.btn{display:inline-block;font-weight:400;color:#212529;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;}
@media (prefers-reduced-motion:reduce){
  .btn{transition:none;}
}
.btn:hover{color:#212529;text-decoration:none;}
.btn:focus{outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.25);}
.btn:disabled{opacity:.65;}
.btn-primary{color:#fff;}
.btn-primary:hover{color:#fff;}
.btn-primary:focus{color:#fff;box-shadow:0 0 0 .2rem rgba(38,143,255,.5);}
.btn-primary:disabled{color:#fff;}
.btn-link{font-weight:400;color:#007bff;text-decoration:none;}
.btn-link:hover{color:#0056b3;text-decoration:underline;}
.btn-link:focus{text-decoration:underline;}
.btn-link:disabled{color:#6c757d;pointer-events:none;}
.btn-block{display:block;width:100%;}
.custom-control{position:relative;z-index:1;display:block;min-height:1.5rem;padding-left:1.5rem;}
.custom-control-input{position:absolute;left:0;z-index:-1;width:1rem;height:1.25rem;opacity:0;}
.custom-control-input:checked~.custom-control-label::before{color:#fff;background-color:#007bff;}
.custom-control-input:focus~.custom-control-label::before{box-shadow:0 0 0 .2rem rgba(0,123,255,.25);}
.custom-control-input:disabled~.custom-control-label{color:#6c757d;}
.custom-control-input:disabled~.custom-control-label::before{background-color:#e9ecef;}
.custom-control-label{position:relative;margin-bottom:0;vertical-align:top;}
.custom-control-label::before{position:absolute;top:.25rem;left:-1.5rem;display:block;width:1rem;height:1rem;pointer-events:none;content:"";background-color:#fff;border:#adb5bd solid 1px;}
.custom-control-label::after{position:absolute;top:.25rem;left:-1.5rem;display:block;width:1rem;height:1rem;content:"";background:no-repeat 50%/50% 50%;}
.custom-checkbox .custom-control-label::before{border-radius:.25rem;}
.custom-checkbox .custom-control-input:checked~.custom-control-label::after{background-image:url("data:image/svg+xml,%3csvg xmlns='https://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3e%3c/svg%3e");}
.custom-checkbox .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(0,123,255,.5);}
.custom-control-label::before{transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;}
@media (prefers-reduced-motion:reduce){
  .custom-control-label::before{transition:none;}
}
.bg-primary{background-color:#007bff!important;}
.d-flex{display:-ms-flexbox!important;display:flex!important;}
.flex-column{-ms-flex-direction:column!important;flex-direction:column!important;}
.align-items-center{-ms-flex-align:center!important;align-items:center!important;}
.w-100{width:100%!important;}
.h-100{height:100%!important;}
.min-vh-100{min-height:100vh!important;}
.mb-0{margin-bottom:0!important;}
.my-4{margin-top:1.5rem!important;}
.mb-4,.my-4{margin-bottom:1.5rem!important;}
.mt-5{margin-top:3rem!important;}
.mb-5{margin-bottom:3rem!important;}
.px-0{padding-right:0!important;}
.px-0{padding-left:0!important;}
.py-5{padding-top:3rem!important;}
.py-5{padding-bottom:3rem!important;}
.my-auto{margin-top:auto!important;}
.mx-auto{margin-right:auto!important;}
.my-auto{margin-bottom:auto!important;}
.mx-auto{margin-left:auto!important;}
@media (min-width:768px){
  .mb-md-0{margin-bottom:0!important;}
}
.text-right{text-align:right!important;}
.text-center{text-align:center!important;}
.text-white{color:#fff!important;}
.text-muted{color:#6c757d!important;}
@media print{
  *,::after,::before{text-shadow:none!important;box-shadow:none!important;}
  a:not(.btn){text-decoration:underline;}
  img{page-break-inside:avoid;}
  h3,p{orphans:3;widows:3;}
  h3{page-break-after:avoid;}
  .container{min-width:992px!important;}
}
/*! CSS Used from: https://oxy.test/css/stylesheet.css */
form{padding:0;margin:0;display:inline;}
img{vertical-align:inherit;}
a,a:focus{color:#007bff;-webkit-transition:all 0.2s ease;transition:all 0.2s ease;}
a:hover,a:active{color:#006adb;text-decoration:none;-webkit-transition:all 0.2s ease;transition:all 0.2s ease;}
a:focus,a:active,.btn:active:focus,.btn:focus,button:focus,button:active{outline:none;}
p{line-height:1.8;}
h1,h3{color:#252b33;font-family:"Poppins", sans-serif;}
.oxyy-login-register .text-4{font-size:18px!important;font-size:1.125rem!important;}
.oxyy-login-register .text-11{font-size:2.75rem!important;}
@media (max-width: 1200px){
  .oxyy-login-register .text-11{font-size:calc(1.4rem + 1.8vw)!important;}
}
.oxyy-login-register .text-11{line-height:1.3;}
.oxyy-login-register .line-height-4{line-height:1.6!important;}
.oxyy-login-register .font-weight-600{font-weight:600!important;}
.oxyy-login-register .opacity-8{opacity:0.8;}
#main-wrapper.oxyy-login-register{background:#fff;}
@media (min-width: 1200px){
  .oxyy-login-register .container{max-width:1170px!important;}
}
.oxyy-login-register .hero-wrap{position:relative;overflow:hidden;}
.oxyy-login-register .hero-wrap .hero-mask,.oxyy-login-register .hero-wrap .hero-bg{position:absolute;top:0;left:0;height:100%;width:100%;}
.oxyy-login-register .hero-wrap .hero-mask{z-index:1;}
.oxyy-login-register .hero-wrap .hero-content{position:relative;z-index:2;}
.oxyy-login-register .hero-wrap .hero-bg{z-index:0;background-attachment:fixed;background-position:center center;background-repeat:no-repeat;background-size:cover;-webkit-background-size:cover;-moz-background-size:cover;transition:background-image 300ms ease-in 200ms;}
.oxyy-login-register .hero-wrap .hero-bg.hero-bg-scroll{background-attachment:scroll;}
.oxyy-login-register .form-control{font-size:16px;color:#656565;}
.oxyy-login-register .form-control:not(.form-control-sm){padding:.810rem .96rem;height:inherit;}
.oxyy-login-register .form-control:focus{-webkit-box-shadow:0 0 5px rgba(128, 189, 255, 0.5);box-shadow:0 0 5px rgba(128, 189, 255, 0.5);}
.oxyy-login-register .form-control::-webkit-input-placeholder{color:#b1b4b6;}
.oxyy-login-register .form-control:-moz-placeholder{color:#b1b4b6;}
.oxyy-login-register .form-control::-moz-placeholder{color:#b1b4b6;}
.oxyy-login-register .form-control:-ms-input-placeholder,.oxyy-login-register .form-control::-ms-input-placeholder{color:#b1b4b6;}
.oxyy-login-register .btn{padding:0.8rem 2.6rem;font-weight:500;-webkit-transition:all 0.5s ease;transition:all 0.5s ease;}
.oxyy-login-register .btn:not(.btn-link){-webkit-box-shadow:0px 5px 15px rgba(0, 0, 0, 0.15);box-shadow:0px 5px 15px rgba(0, 0, 0, 0.15);}
.oxyy-login-register .btn:not(.btn-link):hover{-webkit-box-shadow:0px 5px 15px rgba(0, 0, 0, 0.3);box-shadow:0px 5px 15px rgba(0, 0, 0, 0.3);-webkit-transition:all 0.5s ease;transition:all 0.5s ease;}
@media (max-width: 575.98px){
  .oxyy-login-register .btn:not(.btn-sm){padding:.810rem 2rem;}
}
.oxyy-login-register .bg-primary{background-color:#007bff!important;}
.oxyy-login-register .btn-link{color:#007bff!important;}
.oxyy-login-register .btn-link:hover{color:#006adb!important;}
.oxyy-login-register .btn-primary{background-color:#007bff;}
.oxyy-login-register .btn-primary:hover{background-color:#006adb;}
.oxyy-login-register .btn-primary:focus{background-color:#006adb;}
.oxyy-login-register .custom-control-input:checked ~ .custom-control-label::before,.oxyy-login-register .custom-checkbox .custom-control-input:checked ~ .custom-control-label:before,.oxyy-login-register .custom-control-input:checked ~ .custom-control-label:before{background-color:#007bff;}
</style>
