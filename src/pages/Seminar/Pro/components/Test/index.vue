<template>
  <div id="app">
    <JsPanel v-if="qa.active" :ref="testKey" :visible="true" :options="options01">
      <q-card flat>
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
    </JsPanel>
  </div>
</template>

<script>
export default {
  name: 'TestScreen',
  props: ['project', 'qa', 'testKey'],
  methods: {
    calculatePoint (testKey) {
      let point = 0
      for (let i = 0; i < this.project.qa.parts[testKey].questions.length; i++) {
        if (['selectbox', 'radio'].includes(this.project.qa.parts[testKey].questions[i].type)) {
          const correctAnswer = this.project.qa.parts[testKey].questions[i].options.find(x => x.is_correct)
          if (!correctAnswer) {
            point++
          } else if (correctAnswer.name === this.qaData[this.project.qa.parts[testKey].questions[i].key]) {
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
      document.getElementById(
        'test_' + this.testKey
      ).remove()
      const answerDate = new Date()
      self.qaData.timer = {
        point: self.calculatePoint(testKey),
        answered_at: answerDate.getTime()
      }
      self.$store
        .dispatch('projects/qaSave', {
          data: self.qaData,
          pkey: testKey,
          part_data: self.project.qa.parts[testKey],
          vid: localStorage.getItem('vid'),
          pass: self.$route.params.pass || null,
          project: location.hostname
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
    }
  },
  data () {
    const windowWidth = window.screen.width
    return {
      answeredTests: {
      },
      show: false,
      qaData: {},
      options01: {
        animateIn: 'animated zoomIn faster',
        animateOut: 'animated zoomOut faster',
        headerTitle: '',
        id: 'test_' + this.testKey,
        theme: 'dark',
        position: windowWidth < 768 ? 'left-top 1vw 1vh' : 'left-top 20vw 3vh',
        headerLogo: '<i class="far fa-question-circle"></i>',
        panelSize: {
          width: windowWidth < 768 ? '98vw' : '60vw',
          height: windowWidth < 768 ? '72vh' : '70vh'
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
  watch: {
    qa: {
      handler (val) {
        if (!this.project.qa.parts[this.testKey].active) {
          const element = document.getElementById(
            'test_' + this.testKey
          )
          !element || element.remove()
          // const panels = document.getElementsByClassName('jsPanel')
          // document.getElementsByClassName('jsPanel')[panels.length - 1].remove()
        }
      },
      deep: true
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
