<template>
  <div v-if="stream_project">
    <div class="custom-background" :style="{'background-color': stream_project.bg_color || '#ffffff', 'background-image': 'url('+ ( stream_project.bg_image ? stream_project.bg_image[$route.params.lang] : 'none' ) + ')'}" >
      <div class="row" style="padding:10px; z-index: 9999999" v-if="stream_project.languages.length > 1 && !stream_project.header_enabled">
        <div class="col"></div>
        <div class="col-auto q-gutter-sm q-pt-sm">
          <router-link :key="embkey" v-for="(lang, embkey) in stream_project.languages" :to="{name:$route.name, params : {lang: lang.value }}">
            <q-img width="40px" class="self-end" height="40px" :src="lang.value + '.png'"></q-img>
          </router-link>
        </div>
      </div>
      <div class="row no-margin no-padding">
        <div v-if="stream_project.embed_top" :class="{'col-12 no-margin no-padding flex flex-center': true, 'cursor-pointer': stream_project.embed_top_lang[$route.params.lang]}" @click="$router.push({ name: $route.name, params: { lang: stream_project.embed_top_lang ? stream_project.embed_top_lang[$route.params.lang] : $route.params.lang }})" v-html="stream_project.embed_top ? stream_project.embed_top[$route.params.lang] : null"></div>
        <div class="col-12 no-margin no-padding flex flex-center" v-html="stream_project.embed ? stream_project.embed[$route.params.lang] : null">
        </div>
      </div>
      <div class="row flex flex-center">
        <div class="col-12 q-mt-none flex flex-center q-gutter-x-xl" v-if="stream_project">
          <q-btn :style="{'background-color': stream_project.btn_color ? stream_project.btn_color : '', 'font-size': (stream_project.btn_size ? stream_project.btn_size : 20) + 'px'}"
                 :color="!stream_project.btn_color ? 'green-8' : ''"
                 @click="question_modal = true"
                 v-if="stream_project.ask_questions.enabled && stream_project.ask_questions.question_placement === 'button'"
                 :label=" stream_project.ask_questions[$route.params.lang] || $t('common.askQuestion')"></q-btn>
          </div>
      </div>

      <div class="row q-col-gutter-md q-pa-xl" key="main-layout" v-if="stream_project">
        <q-dialog v-model="question_modal" v-if="stream_project.ask_questions.enabled && stream_project.ask_questions.question_placement === 'button'" >
          <q-card flat style="width: 600px">
            <q-card-section class="text-grey-8 shadow-2">
              <div class="row">
                <div class="col-11">
                  <div class="text-h6">{{ $t('login.askQuestion') }}</div>
                </div>
                <div class="col-1">
                  <q-btn icon="close" flat round dense v-close-popup />
                </div>
              </div>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section class="q-pt-xs no-margin">
              <div v-for="(q, keytt) in stream_project.ask_questions.questions" :key="keytt">
                <q-input :type="q.meta.contact_field === 'q' ? 'textarea' : 'text'" @change="$forceUpdate()" outlined class="q-mt-sm" v-model="question[q.meta.contact_field]" :label="q.question[$route.params.lang]"/>
              </div>
              <q-space />
              <p class="text-red-8" v-if="(errors && errors.message)">{{errors.message[0]}}</p>
              <q-btn @click="questionSubmit" :disable="saving || fetching" class="full-width q-mt-sm q-pa-xs q-btn--no-uppercase" :style="{'background-color': stream_project.btn_color ? stream_project.btn_color : ''}" :color="stream_project.btn_color ? '' : 'green-8'"  :label="(saving || fetching) ?  $t('common.pleaseWait') : $t('common.send')" />
            </q-card-section>
          </q-card>
        </q-dialog>
        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" v-if="stream_project.ask_questions.enabled && stream_project.ask_questions.question_placement === 'module'">
          <q-card flat>
            <q-card-section class="text-grey-8 shadow-2">
              <div class="row">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <div class="text-h6">{{ $t('login.askQuestion') }}</div>
                </div>
              </div>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section class="q-pt-xs no-margin">
              <div v-for="(q, keytt) in stream_project.ask_questions.questions" :key="keytt">
                <q-input :type="q.meta.contact_field === 'q' ? 'textarea' : 'text'" @change="$forceUpdate()" outlined class="q-mt-sm" v-model="question[q.meta.contact_field]"  :label="q.question"/>
              </div>
              <q-space />
              <p class="text-red-8" v-if="(errors && errors.message)">{{errors.message[0]}}</p>
              <q-btn @click="questionSubmit" :disable="saving || fetching" class="full-width q-mt-sm q-pa-xs q-btn--no-uppercase" :style="{'background-color': stream_project.btn_color ? stream_project.btn_color : ''}" :color="stream_project.btn_color ? '' : 'green-8'"  :label="(saving || fetching) ?  $t('common.pleaseWait') : $t('common.send')" />
            </q-card-section>
          </q-card>
        </div>
        <div v-if="new_project.qa">
          <div v-for="(qa, testKey) in new_project.qa.parts" :key="testKey">
            <q-dialog persistent v-if="!answeredTests[testKey]" v-model="qa.active" >
              <q-card flat style="width: 600px">
                <q-card-section class="text-grey-8 shadow-2">
                  <div class="text-h6">{{ qa.time_counter }}</div>
                </q-card-section>
                <q-separator></q-separator>
                <q-card-section class="q-pt-xs no-margin">
                  <div v-for="(question, qapart) in qa.questions" :key="qapart">
                    <q-input @input="() => {$forceUpdate();}" @change="() => {$forceUpdate(); }" outlined v-if="question.type === 'string'" class="q-mt-sm" v-model="qaData[question.key]" :label="question.question"/>
                    <div v-if="question.type === 'radio'" class="q-gutter-sm q-px-sm q-pt-md text-grey-9 row">
                      <q-item-label v-html="question.question"></q-item-label>
                      <div class="col-12" :key="keys234" v-for="(opt, keys234) in question.options">
                        <q-radio @input="() => {$forceUpdate(); }" v-model="qaData[question.key]"  :val="opt.name" :label="opt.name" />
                      </div>
                    </div>
                    <q-select class="q-mt-sm" @input="() => {$forceUpdate(); }" v-if="question.type === 'selectbox'" outlined v-model="qaData[question.key]" option-label="name" emit-value option-value="name" :options="question.options" :label="question.question" />
                  </div>
                </q-card-section>
                <q-separator></q-separator>
                <q-card-section>
                  <q-btn color="green" @click="() => {$forceUpdate(); qaSubmit(testKey)  }">{{$t('common.send')}}</q-btn>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from '../../libraries/db'
import moment from 'moment'
export default {
  name: 'Stream',
  meta () {
    return {
      title: this.title,
      titleTemplate: title => `${title}`
    }
  },
  firebase () {
    const self = this
    return {
      new_project: db.ref('projects/' + self.stream_project.firebase)
    }
  },
  data () {
    return {
      answeredTests: {
      },
      new_project: {},
      messages: [],
      moment,
      askedQuestions: [],
      qaData: {},
      qaActive: false,
      qaPartKey: null,
      question_modal: false,
      qaMessage: '',
      question: {
        vid: localStorage.getItem('vid'),
        pass: this.$route.params.pass || null,
        project: location.hostname,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        q: null
      },
      questionMessage: '',
      qaErrors: []
    }
  },
  props: ['first_name', 'last_name', 'email', 'phone'],
  computed: {
    title () {
      return this.stream_project && this.stream_project.name ? this.stream_project.name[this.$route.params.lang] : '...'
    },
    errors () {
      return this.$store.state.users.errors
    },
    stream_project () {
      return this.$store.state.projects.stream_project
    },
    saving () {
      return this.$store.state.projects.saving
    },
    fetching () {
      return this.$store.state.projects.fetching
    }
  },
  methods: {
    snakeCase (string) {
      return string.replace(/\d+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join('_')
    },
    calculatePoint (testKey) {
      let point = 0
      for (let i = 0; i < this.new_project.qa.parts[testKey].questions.length; i++) {
        if (['selectbox', 'radio'].includes(this.new_project.qa.parts[testKey].questions[i].type)) {
          const correctAnswer = this.new_project.qa.parts[testKey].questions[i].options.find(x => x.is_correct)
          if (!correctAnswer) {
            point++
          } else if (correctAnswer.name === this.qaData[this.new_project.qa.parts[testKey].questions[i].key]) {
            point++
          }
        }
      }
      return point
    },
    qaSubmit (testKey) {
      const self = this
      this.$q.notify({
        message: this.$t('common.savedQuestion'),
        color: 'green-8',
        position: 'top'
      })
      this.answeredTests[testKey] = true
      const answerDate = new Date()
      self.qaData.timer = {
        point: self.calculatePoint(testKey),
        answered_at: answerDate.getTime()
      }
      self.$store
        .dispatch('projects/qaSave', {
          data: self.qaData,
          pkey: testKey,
          part_data: self.new_project.qa.parts[testKey],
          vid: localStorage.getItem('vid'),
          pass: self.$route.params.pass || null,
          project: location.hostname
        })
    },
    questionSubmit () {
      this.question.lang = this.$route.params.lang
      this.$store
        .dispatch('projects/questionSave', this.question).then(res => {
          this.question.q = ''
          this.questionMessage = this.$t('common.successfullySavedQuestion')
          this.question_modal = false
          this.$q.notify({
            message: this.$t('common.successfullySavedQuestion'),
            color: 'green-8',
            position: 'top'
          })
        })
    }
  },
  sockets: {
    clearLocalStorage () {
      localStorage.clear()
    },
    refreshPage (d) {
      window.location.reload()
    }
  },
  mounted () {
    if (this.stream_project.favicon) {
      const favicon = document.getElementById('favicon')
      favicon.href = this.stream_project.favicon
    }
  },
  created () {
    const self = this
    self.$store.dispatch('projects/fetchProjectByDomain', { project: location.hostname }).then(resp => {
      self.project = resp
      if (!resp.live_support_enabled) {
        // eslint-disable-next-line
        // window.$_REVECHAT_API.Button.hide()
      }
      if (this.first_name) {
        this.question.first_name = this.first_name
      }
      if (this.last_name) {
        this.question.last_name = this.last_name
      }
      if (this.email) {
        this.question.email = this.email
      }
      if (this.phone) {
        this.question.phone = this.phone
      }
    })
  }
}
</script>
<style>
.custom-background {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 100vh;
}
</style>
