<template>
  <div id="app">
    <JsPanel :visible="show" :options="options01" @close="show = false">
      <q-card flat>
        <q-card-section class="q-pt-xs no-margin">
          <div v-for="(q, keytt) in project.ask_questions.questions" :key="keytt">
            <q-input :type="q.meta.contact_field === 'q' ? 'textarea' : 'text'" @change="$forceUpdate()" outlined class="q-mt-sm" v-model="question[q.meta.contact_field]" :label="q.question[$route.params.lang]"/>
          </div>
          <q-space />
          <p class="text-red-8" v-if="(errors && errors.message)">{{errors.message[0]}}</p>
          <q-btn @click="questionSubmit" :disable="saving || fetching" class="full-width q-mt-sm q-pa-xs q-btn--no-uppercase" :style="{'background-color': project.btn_color ? project.btn_color : ''}" :color="project.btn_color ? '' : 'green-8'"  :label="(saving || fetching) ?  $t('common.pleaseWait') : $t('common.send')" />
        </q-card-section>
      </q-card>
    </JsPanel>
  </div>
</template>

<script>
export default {
  name: 'AskQuestionScreen',
  props: ['project'],
  methods: {
    questionSubmit () {
      this.$store
        .dispatch('projects/questionSave', this.question).then(res => {
          this.question.q = ''
          this.$q.notify({
            message: this.$t('common.successfullySavedQuestion'),
            color: 'green-8',
            position: 'top'
          })
        })
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
        headerTitle: this.$t('login.askQuestion'),
        theme: 'dark',
        position: windowWidth < 768 ? 'left-top 1vw 1vh' : 'right-top -1vw 1vh',
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
      question: {
        vid: localStorage.getItem('vid'),
        pass: this.$route.params.pass || null,
        project: location.hostname,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        q: null
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
