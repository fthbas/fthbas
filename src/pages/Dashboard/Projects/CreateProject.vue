<template>
  <div>
    <div class="q-px-md" style="margin-bottom: 50px;">
      <div class="row q-px-md">
        <q-page-sticky expand position="top" class="q-px-md" style="z-index: 1999;">
          <q-toolbar class="col-12 bg-grey-2" style="height: 50px; min-height: 50px; padding-left: 0;">
            <q-btn align="around" @click="$router.go(-1)" class="btn-fixed-width" color="grey-8" flat
                   icon="la la-arrow-left">
              <q-tooltip anchor="top middle" transition-show="flip-right" transition-hide="flip-left"
                         self="center middle">
                {{ $t('common.back') }}
              </q-tooltip>
            </q-btn>
            <q-separator vertical></q-separator>
            <div class="q-px-xs ">
              <q-btn
                unelevated
                text-color="primary"
                :label="$t('common.cancel')"
                icon="las la-hammer"
                :to="{name: 'projects'}"
              >
                <q-tooltip anchor="top middle" transition-show="flip-right" transition-hide="flip-left"
                           self="center middle">
                  {{ $t('common.cancel') }}
                </q-tooltip>
              </q-btn>
              <q-btn
                unelevated
                text-color="green-8"
                :label="$t('common.save')"
                @click="saveProject"
                icon="las la-save"
              >
                <q-tooltip anchor="top middle" transition-show="flip-right" transition-hide="flip-left"
                           self="center middle">
                  {{ $t('common.save') }}
                </q-tooltip>
              </q-btn>
            </div>
            <q-space/>
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
                <div class="text-h6">Proje Oluştur</div>
                <span v-if="user && saving" class="text-grey-8"><q-icon size="sm"
                                                                        name="las la-spinner la-spin"></q-icon> {{
                    $t('common.pleaseWait')
                  }}</span>
                <span v-else class="text-subtitle2">Yeni Proje Oluşturun</span>
              </div>
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-section>
            <div class="row" v-if="user && !fetching">
              <div class="col-12">
                <div class="row">
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input clearable outlined v-model="project.name['tr']" :label="$t('inputs.name')"></q-input>
                  </div>
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
  name: 'Createproject',
  meta () {
    return {
      title: 'Proje Oluştur',
      titleTemplate: title => `${title} `
    }
  },
  methods: {
    saveProject () {
      this.$store.dispatch('projects/createProject', { data: this.project })
    }
  },
  created () {
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  computed: {
    user () {
      return this.$store.state.users.user
    },
    saving () {
      return this.$store.state.projects.saving
    },
    fetching () {
      return this.$store.state.projects.fetching
    }
  },
  data () {
    return {
      project: {
        languages: [{ label: 'Türkçe', value: 'tr', deletable: false, icon: null }],
        name: {},
        stream_settings: {
          layout: {
            label: 'Default',
            value: 1
          }
        },
        embed_top: {},
        embed_top_lang: {},
        login_settings: {
          translate: {
            loginTitle: { tr: 'Giriş Yap', en: 'Login' },
            login: { tr: 'Giriş Yap', en: 'Login' },
            pleaseWait: { tr: 'Lütfen Bekleyin', en: 'Please wait' },
            sendCode: { tr: 'Kod Gönder', en: 'Send Code' },
            registerNow: { tr: 'Hesabınız yok mu? Kayıt olun.', en: 'Do not you have an account? Register now!' },
            forgotPassword: { tr: 'Şifrenizi mi unuttunuz', en: 'Forgot your password?' },
            enterPassword: { tr: 'Şifre', en: 'Password' },
            enterEmail: { tr: 'Eposta', en: 'Email' },
            invalidPassword: { tr: 'Hatalı Şifre', en: 'Invalid Password' },
            invalidPhone: { tr: 'Hatalı Telefon', en: 'Invalid Phone' },
            invalidCode: { tr: 'Hatalı Kod', en: 'Invalid Code' }
          }
        },
        register_settings: {
          translate: {
            registerTitle: {
              tr: 'Kayıt Ol',
              en: 'Register'
            },
            register: {
              tr: 'Kayıt Ol',
              en: 'Register'
            },
            ok: {
              tr: 'Tamam',
              en: 'OK'
            },
            hereYourLink: {
              tr: 'Giriş Linkiniz',
              en: 'Your Access Link'
            },
            goToLink: {
              tr: 'Linke git',
              en: 'Go to link'
            },
            pleaseWait: {
              tr: 'Lütfen bekleyin',
              en: 'Please wait'
            },
            pleaseSelect: {
              tr: 'Lütfen seçin',
              en: 'Please select'
            },
            gdprTitle: {
              tr: 'Şartları ve koşulları kabul ediyorum.',
              en: 'I accept terms and conditions.'
            },
            save: {
              tr: 'Kayıt Ol',
              en: 'Register'
            },
            loginNow: {
              tr: 'Hesabınız var mı? Giriş yapın.',
              en: 'Have an account? Login now.'
            },
            isRequired: {
              tr: 'alanı zorunludur.',
              en: 'is required.'
            },
            mustBeEmail: {
              tr: 'alanı gerçek bir eposta adresi olmalıdır.',
              en: 'must be a real email.'
            },
            mustBe11: {
              tr: 'alanı 11 karakter olmalıdır.',
              en: 'must be 11 characters'
            },
            mustAcceptGDPR: {
              tr: 'Şartları ve koşulları kabul etmelisiniz.',
              en: 'You must accept terms and conditions.'
            },
            loginWithYourPassword: {
              tr: 'Başarıyla kayıt edildi. Lütfen hesabınızla giriş yapınız.',
              en: 'Successfully registered. Please login using the account you already have.'
            },
            loginSentEmail: {
              tr: 'Giriş bilgileriniz eposta adresinize gönderildi.',
              en: 'Your login information has been sent to your e-mail address.'
            },
            loginWithYourPhone: {
              tr: 'Başarıyla kayıt edildi. Telefon numaranızla giriş yapabilirsiniz.',
              en: 'Your information is successfully saved. You can request password at login page with your phone.'
            },
            registerSuccess: {
              tr: 'Bilgileriniz başarıyla kayıt edildi.',
              en: 'Your information is successfully saved.'
            },
            alreadyRegistered: {
              tr: 'Bu eposta adresi ile zaten kayıt olundu. Lütfen hesabınızı kullanarak giriş yapın.',
              en: 'This email address is already registered. Please login using the account you already have.'
            },
            anErrorOccured: {
              tr: 'Bir hata oluştu.',
              en: 'An error has occurred'
            }
          }
        },
        description: {},
        gdpr_title: {},
        gdpr_text: {},
        gdpr_disabled: {},
        sms_auth_2_fa: false,
        live_support_enabled: false,
        disable_create: false,
        start_date: null,
        end_date: null,
        header_enabled: false,
        call_to_action_enabled: false,
        status_checker_enabled: false,
        send_sms_after_registration: false,
        show_forget_password_at_login: false,
        show_login_link_at_register: false,
        show_register_link_at_login: false,
        login_type: { label: 'Herkes Girebilir', value: 'all' },
        embed: { embed: '', language: '' },
        btn_color: '#c70000',
        btn_size: 20,
        bg_color: '#fff',
        bg_image: {},
        header_logo: {},
        favicon: {},
        login_image: {},
        login_image_small: {},
        domain: '',
        default_language: 'tr',
        qa_enabled: false,
        qa_popup_timer: 20,
        qa: {
          parts: {}
        },
        ask_questions: {
          enabled: false,
          show_on_visitor_screen: false,
          moderated: false,
          question_placement: 'button',
          questions: []
        },
        survey: {
          enabled: false,
          survey_placement: 'button',
          questions: []
        },
        register_form: {
          use_own_password: false,
          default_route: {
            label: 'Kayıt Sayfası',
            value: 'live.register'
          },
          show_login_link_at_success: false,
          use_common_password: false,
          send_email: false,
          email_subject: {},
          email_sender_name: {},
          email_footer_text: {},
          email_string: {},
          email_logo: {},
          email_content: {},
          enabled: true,
          questions: []
        }
      }
    }
  }
}
</script>
<style lang="css">
</style>
