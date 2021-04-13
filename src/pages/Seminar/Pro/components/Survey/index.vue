<template>
  <div id="app">
    <JsPanel :visible="show" :options="options01" @close="show = false">
      <q-card flat>
        <q-card-section class="q-pt-xs no-margin">
          <div v-for="(question, keytt) in project.survey.questions" :key="keytt">
            <q-input @change="$forceUpdate()" outlined v-if="question.type === 'string' && !question.meta" class="q-mt-sm" v-model="surveyData[snakeCase(question.question)]" :label="question.question"/>
            <q-input @change="$forceUpdate()" outlined v-if="question.type === 'string' && question.meta" class="q-mt-sm" v-model="surveyData[question.meta.contact_field]" :label="question.question"/>
            <q-input @change="$forceUpdate()" type="number" outlined v-if="question.type === 'number'" class="q-mt-sm" v-model="surveyData[snakeCase(question.question)]" :label="question.question"/>
            <div v-if="question.type === 'gender'" class="q-gutter-sm q-px-sm q-pt-md text-grey-9">
              <q-item-label>{{question.question}}</q-item-label>
              <q-radio @input="$forceUpdate()"  v-model="surveyData[question.meta.contact_field]" :key="keyert" v-for="(opt, keyert) in question.options" :val="opt.value" :label="opt.name" />
            </div>
            <div v-if="question.type === 'radio'" class="q-gutter-sm q-px-sm q-pt-md text-grey-9">
              <q-item-label>{{question.question}}</q-item-label>
              <q-radio @input="$forceUpdate()" v-model="surveyData[snakeCase(question.question)]" :key="keys234" v-for="(opt, keys234) in question.options" :val="opt.name" :label="opt.name" />
            </div>
            <div v-if="question.type === 'checkbox'" class="q-gutter-sm q-px-sm q-pt-md text-grey-9">
              <q-item-label>{{question.question}}</q-item-label>
              <q-checkbox @input="$forceUpdate()" v-model="surveyData[snakeCase(question.question)]" :key="keys65" v-for="(opt, keys65) in question.options" :val="opt.name" :label="opt.name" />
            </div>
            <q-select class="q-mt-sm" @input="$forceUpdate()" v-if="question.type === 'selectbox'" outlined v-model="surveyData[snakeCase(question.question)]" option-label="name" emit-value option-value="name" :options="question.options" :label="question.question" />
          </div>
          <q-space />
          <p class="text-red-8" v-if="(errors && errors.message)">{{errors.message[0]}}</p>
          <q-btn @click="surveySubmit" :disable="saving || fetching" class="full-width q-mt-sm q-pa-xs q-btn--no-uppercase" :style="{'background-color': project.btn_color ? project.btn_color : ''}" :color="project.btn_color ? '' : 'green-8'"  :label="(saving || fetching) ?  $t('common.pleaseWait') : $t('common.send')" />
        </q-card-section>
      </q-card>
    </JsPanel>
  </div>
</template>

<script>
export default {
  name: 'Survey',
  props: ['project'],
  methods: {
    surveySubmit () {
      this.$store
        .dispatch('projects/surveySave', this.surveyData).then(res => {
          this.$q.notify({
            message: this.$t('common.successfullySavedSurvey'),
            color: 'green-8',
            position: 'top'
          })
        })
    },
    snakeCase (string) {
      return string.replace(/\d+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join('_')
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
    },
    localQa () {
      return {}
    },
    options01 () {
      const windowWidth = window.screen.width
      return {
        animateIn: 'animated zoomIn faster',
        animateOut: 'animated zoomOut faster',
        headerTitle: this.$t('login.survey'),
        theme: 'dark',
        position: windowWidth < 768 ? 'left-top 1vw 1vh' : 'right-top -1vw 38vh',
        headerLogo: '<i class="far fa-question-circle"></i>',
        panelSize: {
          width: windowWidth < 768 ? '98vw' : '22vw',
          height: windowWidth < 768 ? '48vh' : '35vh'
        },
        callback: function (panel) {
          if (windowWidth < 768) {
            panel.minimize()
          }
        },
        onminimized: function () {
          setTimeout(() => {
            document.querySelector('#jsPanel-replacement-container').appendChild(document.querySelector('.languages'))
          }, 0)
        }
      }
    }
  },
  data () {
    return {
      show: true,
      surveyData: {
        vid: localStorage.getItem('vid'),
        pass: this.$route.params.pass || null,
        project: location.hostname,
        first_name: null,
        last_name: null,
        email: null,
        phone: null
      }
    }
  }
}
</script>

<style>
iframe {
  width: 100%;
  height: 100%;
}
</style>
