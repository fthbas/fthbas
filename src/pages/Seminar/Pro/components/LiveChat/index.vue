<template>
  <div id="app">
    <JsPanel :visible="show" :options="options01" @close="show = false">
      <iframe src="https://www.harikasohbet.com/sohbet/" scrolling="yes"></iframe>
    </JsPanel>
  </div>
</template>

<script>
export default {
  name: 'ChatScreen',
  data () {
    const windowWidth = window.screen.width
    return {
      show: true,
      options01: {
        animateIn: 'animated zoomIn faster',
        animateOut: 'animated zoomOut faster',
        headerTitle: 'Sohbet',
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
iframe {
  width: 100%;
  height: 100%;
}
</style>
