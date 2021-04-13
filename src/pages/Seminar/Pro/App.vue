<template>
  <div id="app">
    <div class="rotate"></div>
    <VideoScreen :project="stream_project" :embed="stream_project.embed ? stream_project.embed[$route.params.lang] : null" />
    <AskQuestion :project="stream_project" v-if="stream_project.ask_questions.enabled" />
    <Survey :project="stream_project" v-if="stream_project.survey.enabled" />
    <div v-if="new_project.qa">
      <div v-for="(qa, testKey) in new_project.qa.parts" :key="testKey">
        <Test :ref="testKey" :qa="qa" :testKey="testKey" :project="new_project" />
      </div>
    </div>
    <div class="languages">
      <div class="inner">
        <div class="toggle">
          <i class="fas fa-headphones"></i>
        </div>
        <div class="list" v-if="stream_project.languages">
          <router-link v-for="(language, languageKey) in stream_project.languages" :key="languageKey" :to="{name:$route.name, params : {lang: language.value }}">
            <a :style="{
                'background': 'url('+ language.value + '.png) no-repeat center',
                'background-size': '30px'
            }"></a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VideoScreen from './components/VideoScreen'
import SpeakersScreen from './components/SpeakersScreen'
import SurveyScreen from './components/SurveyScreen'
import QuestionsScreen from './components/QuestionsScreen'
import LiveChat from './components/LiveChat'
import AskQuestion from './components/AskQuestion'
import Survey from './components/Survey'
import Test from './components/Test'
import db from '../../../libraries/db'
import moment from 'moment'
export default {
  name: 'Pro',
  components: {
    VideoScreen,
    Test,
    AskQuestion,
    Survey,
    QuestionsScreen,
    SpeakersScreen,
    SurveyScreen,
    LiveChat
  },
  props: ['first_name', 'last_name', 'email', 'phone'],
  data () {
    return {
      new_project: {},
      messages: [],
      moment,
      timeOuter: null,
      statusCheckerTimeout: null,
      sayacInterval: null,
      sayac: 0,
      askedQuestions: [],
      qaData: {},
      qaActive: false,
      qaPartKey: null,
      call_to_action_active: false,
      call_to_action_message: {
        title: '',
        text: ''
      },
      status_check_active: false,
      status_check_message: {
        title: '',
        text: ''
      },
      question_modal: false,
      survey_modal: false,
      qaMessage: '',
      surveyMessage: '',
      questionMessage: '',
      project: null,
      qaErrors: []
    }
  },
  meta () {
    return {
      title: this.title,
      titleTemplate: title => `${title}`
    }
  },
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
    },
    localQa () {
      return {}
    }
  },
  methods: {
    clearStatusCheck () {
      clearTimeout(this.statusCheckerTimeout)
      this.$store
        .dispatch('projects/statusChecked', {
          status: true,
          vid: localStorage.getItem('vid'),
          pass: this.$route.params.pass || null,
          project: location.hostname
        }).then(res => {
          this.status_check_active = false
          this.statusCheckerTimeout = null
        }).catch(() => {
          this.status_check_active = false
          this.statusCheckerTimeout = null
        })
    },
    snakeCase (string) {
      return string.replace(/\d+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join('_')
    }
  },
  sockets: {
    clearLocalStorage () {
      localStorage.clear()
    },
    refreshPage (d) {
      window.location.reload()
    },
    questionsByPointToVisitors (d) {
      this.askedQuestions = d
    },
    callToAction (d) {
      this.call_to_action_message = d
      this.call_to_action_active = true
    },
    statusCheck (d) {
      this.status_check_message = d
      this.status_check_active = true
      const self = this
      this.statusCheckerTimeout = setTimeout(function () {
        self.$store
          .dispatch('projects/statusChecked', {
            status: false,
            vid: localStorage.getItem('vid'),
            pass: self.$route.params.pass || null,
            project: location.hostname
          }).then(res => {
            if (d.url) {
              window.location.href = '//' + d.url
            } else {
              self.status_check_message = {
                title: '',
                text: ''
              }
              self.status_check_active = false
            }
          }).catch(() => {
            if (d.url) {
              window.location.href = '//' + d.url
            } else {
              self.status_check_message = {
                title: '',
                text: ''
              }
              self.status_check_active = false
            }
          })
      }, parseInt(d.timer) * 1000)
    }
  },
  firebase () {
    const self = this
    return {
      new_project: db.ref('projects/' + self.stream_project.firebase)
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
        this.surveyData.first_name = this.first_name
      }
      if (this.last_name) {
        this.question.last_name = this.last_name
        this.surveyData.last_name = this.last_name
      }
      if (this.email) {
        this.question.email = this.email
        this.surveyData.email = this.email
      }
      if (this.phone) {
        this.question.phone = this.phone
        this.surveyData.phone = this.phone
      }
      this.surveyData.questions = self.project.survey.questions
      if (self.project.survey.questions && self.project.survey.enabled && self.project.survey.questions.length > 0) {
        for (let i = 0; i < self.project.survey.questions.length; i++) {
          if (self.project.survey.questions[i].type === 'checkbox') {
            self.surveyData[self.snakeCase(self.project.survey.questions[i].question)] = []
          } else {
            if (self.project.survey.questions[i].meta && self.project.survey.questions[i].meta.contact_field) {
              self.surveyData[self.project.survey.questions[i].meta.contact_field] = ''
            } else {
              self.surveyData[self.snakeCase(self.project.survey.questions[i].question)] = ''
            }
          }
        }
      }
    }).catch(() => {
      console.log('err')
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css');
/*body {*/
/*  min-height: -webkit-fill-available;*/
/*  width: 100vw;*/
/*  height: 100vh;*/
/*  overflow: hidden;*/
/*  margin: 0;*/
/*}*/
/*body * {*/
/*  box-sizing: border-box!important;*/
/*  -webkit-box-sizing: border-box!important;*/
/*}*/
#app {
  font-family: "Poppins", sans-serif;
  color: #2c3e50;
  background: url('./assets/bg.png');
  min-height: -webkit-fill-available;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.jsPanel-titlebar * {
  font-variant: unset!important;
}
.jsPanel-btn-smallify,
.jsPanel-btn-close {
  display: none!important;
}
.jsPanel-depth-3 {
  overflow: hidden;
}
.jsPanel-headerbar {
  padding-left: 13px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.jsPanel-hdr-toolbar.active {
  padding-bottom: 7px;
}
.jsPanel-ftr {
  padding-top: 10px!important;
  padding-bottom: 10px!important;
}
.jsPanel-ftr i {
  opacity: .5;
  margin-right: 5px;
}
.jsPanel-headerbar {
  font-weight: 700;
  background: #576490;
}
#jsPanel-replacement-container{
  width: 100%!important;
  justify-content: center!important;
}
#jsPanel-replacement-container .jsPanel-headerbar,
#jsPanel-replacement-container .jsPanel-hdr,
#jsPanel-replacement-container .jsPanel-replacement {
  position: relative;
  width: 75px!important;
  height: 75px!important;
  padding: 0!important;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  transition: all .3s linear;
  z-index: 10;
}
#jsPanel-replacement-container .jsPanel-headerbar:hover,
#jsPanel-replacement-container .jsPanel-hdr:hover,
#jsPanel-replacement-container .jsPanel-replacement:hover {
  background: #000;
}
#jsPanel-replacement-container .jsPanel-title {
  display: none;
}
#jsPanel-replacement-container .jsPanel-btn-normalize {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
#jsPanel-replacement-container .jsPanel-btn-maximize {
  display: none;
}
#jsPanel-replacement-container .jsPanel-headerlogo {
  font-size: 30px;
  text-align: center;
  width: 100%;
  max-width: 100%!important;
  margin-right: -5px;
}
@media(max-width: 690px) {
  #jsPanel-replacement-container .jsPanel-headerbar,
  #jsPanel-replacement-container .jsPanel-hdr,
  #jsPanel-replacement-container .jsPanel-replacement {
    width: 40px!important;
    height: 40px!important;
  }
  #jsPanel-replacement-container .jsPanel-headerlogo {
    font-size: 14px;
  }
  #jsPanel-replacement-container .jsPanel-headerlogo svg {
    margin: 0;
  }
}
.languages {
  position: fixed;
  left: 50%;
  bottom: 0;
}
.languages .inner {
  position: relative;
}
.languages .toggle {
  cursor: pointer;
  position: relative;
  width: 75px!important;
  height: 75px!important;
  padding: 0!important;
  text-align: center;
  color: #fff;
  font-size: 25px;
  line-height: 75px;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  transition: all .3s linear;
  z-index: 10;
  background: #576490;
}
.languages .list {
  display: none;
  position: absolute;
  left: 0;
  bottom: 100%;
  width: 100%;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  transition: all .3s linear;
  z-index: 10;
  background: #576490;
}
.languages a {
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-left: 0;
  border-radius: 100%;
}
.languages .list a {
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #576490;
}
.languages a.tr {
  background: url('./assets/tr.svg') no-repeat center;
  background-size: 25px;
}
.languages a.en {
  background: url('./assets/en.svg') no-repeat center;
  background-size: 25px;
}
.languages:hover .toggle {
  border-radius: unset;
}
.languages:hover .list {
  display: block;
}
#jsPanel-replacement-container .languages {
  position: relative;
  margin: 0 2px;
  left: unset;
  bottom: -1px;
}
@media screen and (orientation:portrait) {
  .rotate {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: #fff url('./assets/rotate.gif');
    background-size: 60px;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 999;
  }
  #jsPanel-replacement-container {
    display: none!important;
  }
}
@media(max-width: 768px) {
  .languages .toggle {
    width: 40px!important;
    height: 40px!important;
    font-size: 17px;
    line-height: 40px;
  }
}
.jsPanel-ftr {
  position: relative;
  padding-right: 20px!important;
}
.jsPanel-standard .jsPanel-content::after,
.jsPanel-ftr::after {
  opacity: .5;
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 5px;
  width: 10px;
  height: 1px;
  background: #000;
  transform: rotate(-50deg);
}
.jsPanel-standard .jsPanel-content::before,
.jsPanel-ftr::before {
  opacity: .5;
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 8px;
  width: 16px;
  height: 1px;
  background: #000;
  transform: rotate(-50deg);
}
.video-area {
  position: relative;
  z-index: 5;
}
</style>
