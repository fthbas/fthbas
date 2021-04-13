<template>
  <div id="main-wrapper" class="oxyy-login-register">
    <div class="container-fluid px-0">
      <div class="row no-gutters min-vh-100">
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
        <div class="col-md-6 d-flex align-items-center">
          <div class="container my-auto py-5">
            <div class="row">
              <div class="col-11 col-lg-9 col-xl-8 mx-auto">
                <h3 class="font-weight-600 q-py-md">Şifrenizi Sıfırlayın</h3>
                <h6 class="font-weight-300 text-red-8 no-margin">{{error}}</h6>
                <div class="form-group">
                  <input type="email" class="form-control" v-if="project.register_form.use_own_password" v-model="loginData.email" required :placeholder="$t('inputs.email')" autocomplete="off">
                </div>
                <div class="row">
                  <div class="col-sm text-right"><router-link :to="{ name: 'live.login', params: { lang: this.$route.params.lang } }" class="btn-link" href="#">Veya buradan hesabınıza giriş yapın.</router-link></div>
                </div>
                <p class="text-red-8" v-if="(errors && errors.message)">{{errors.message[0]}}</p>
                <button :disabled="saving || fetching" class="btn btn-primary btn-block my-4"  style="cursor:pointer;" type="button" @click="submit" >{{ (saving || fetching) ?  $t('common.pleaseWait') : 'Sıfırla' }}</button>
                <p class="text-center text-muted mb-0">Hesabınız yok mu? <router-link class="btn-link" :to="{ name: 'live.register', params: { lang: this.$route.params.lang } }">Kayıt Olun</router-link></p>
              </div>
            </div>
            <q-dialog v-model="success">
              <q-card class="q-pa-xl">
                <q-card-section>
                  <div class="text-h6">Şifreniz Sıfırlandı</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  Giriş yapmak için epostanıza gelen yönergeleri takip edin.
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Tamam" color="primary" :to="{ name: 'live.login', params: { lang: this.$route.params.lang } }"  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
        <!-- Login Form End -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'F1',
  props: ['project'],
  data () {
    return {
      success: false,
      loginData: {
        project: location.hostname,
        email: '',
        lang: this.$route.params.lang
      },
      error: ''
    }
  },
  computed: {
    errors () {
      return this.$store.state.users.errors
    },
    saving () {
      return this.$store.state.projects.saving
    },
    fetching () {
      return this.$store.state.projects.fetching
    }
  },
  methods: {
    submit () {
      const self = this
      this.$store
        .dispatch('projects/passwordRecover', this.loginData).then(res => {
          self.success = true
          self.loginData.email = ''
        }).catch(() => {
          self.success = true
          self.loginData.email = ''
        })
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
.form-control:focus{color:#495057;background-color:#fff;border-color:#80bdff;outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.25);}
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
.btn-primary{color:#fff;background-color:#007bff;border-color:#007bff;}
.btn-primary:hover{color:#fff;background-color:#0069d9;border-color:#0062cc;}
.btn-primary:focus{color:#fff;background-color:#0069d9;border-color:#0062cc;box-shadow:0 0 0 .2rem rgba(38,143,255,.5);}
.btn-primary:disabled{color:#fff;background-color:#007bff;border-color:#007bff;}
.btn-link{font-weight:400;color:#007bff;text-decoration:none;}
.btn-link:hover{color:#0056b3;text-decoration:underline;}
.btn-link:focus{text-decoration:underline;}
.btn-link:disabled{color:#6c757d;pointer-events:none;}
.btn-block{display:block;width:100%;}
.custom-control{position:relative;z-index:1;display:block;min-height:1.5rem;padding-left:1.5rem;}
.custom-control-input{position:absolute;left:0;z-index:-1;width:1rem;height:1.25rem;opacity:0;}
.custom-control-input:checked~.custom-control-label::before{color:#fff;border-color:#007bff;background-color:#007bff;}
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
.oxyy-login-register .form-control{border-color:#dae1e3;font-size:16px;color:#656565;}
.oxyy-login-register .form-control:not(.form-control-sm){padding:.810rem .96rem;height:inherit;}
.oxyy-login-register .form-control:focus{-webkit-box-shadow:0 0 5px rgba(128, 189, 255, 0.5);box-shadow:0 0 5px rgba(128, 189, 255, 0.5);border-color:#80bdff!important;}
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
.oxyy-login-register .btn-primary{background-color:#007bff;border-color:#007bff;}
.oxyy-login-register .btn-primary:hover{background-color:#006adb;border-color:#006adb;}
.oxyy-login-register .btn-primary:focus{background-color:#006adb;border-color:#006adb;}
.oxyy-login-register .custom-control-input:checked ~ .custom-control-label::before,.oxyy-login-register .custom-checkbox .custom-control-input:checked ~ .custom-control-label:before,.oxyy-login-register .custom-control-input:checked ~ .custom-control-label:before{background-color:#007bff;border-color:#007bff;}
</style>
