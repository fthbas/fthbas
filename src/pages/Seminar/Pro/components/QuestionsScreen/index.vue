<template>
  <div id="app">
    <JsPanel :visible="show" :options="options01" @close="show = false">
      <div></div>
    </JsPanel>
  </div>
</template>

<script>
export default {
  name: 'QuestionsScreen',
  data () {
    const windowWidth = window.screen.width
    return {
      show: true,
      options01: {
        animateIn: 'animated zoomIn faster',
        animateOut: 'animated zoomOut faster',
        headerTitle: 'Soru Cevap',
        theme: 'dark',
        position: windowWidth < 768 ? 'left-top 1vw 1vh' : 'right-top -1vw 1vh',
        headerLogo: '<i class="far fa-question-circle"></i>',
        panelSize: {
          width: windowWidth < 768 ? '98vw' : '22vw',
          height: windowWidth < 768 ? '72vh' : '55vh'
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
  }
}
</script>

<style>
</style>
