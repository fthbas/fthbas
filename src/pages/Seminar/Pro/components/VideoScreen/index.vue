<template>
  <div id="app">
    <JsPanel :visible="show" :options="options01" @close="show = false">
      <div class="video-area" v-html="embed">
      </div>
    </JsPanel>
  </div>
</template>

<script>
export default {
  name: 'VideoScreen',
  props: ['embed', 'project'],
  data () {
    const windowWidth = window.screen.width
    return {
      show: true,
      options01: {
        animateIn: 'animated zoomIn faster',
        animateOut: 'animated zoomOut faster',
        headerTitle: 'Canlı Yayın',
        theme: 'dark',
        position: windowWidth < 768 ? 'left-top 1vw 1vh' : 'left-top 25vw 1vh',
        headerLogo: '<i class="fas fa-video"></i>',
        footerToolbar: '<i class="fas fa-clock"></i><span class="clock">' + this.$t('common.pleaseWait') + '</span>',
        callback: function (panel) {
          function clock () {
            const time = new Date(),
              hours = time.getHours(),
              minutes = time.getMinutes(),
              seconds = time.getSeconds()
            panel.footer.querySelectorAll('.clock')[0].innerHTML = `${harold(hours)}:${harold(minutes)}:${harold(seconds)}`
            function harold (standIn) {
              if (standIn < 10) { standIn = '0' + standIn }
              return standIn
            }
          }
          setInterval(clock, 1000)
        },
        onminimized: function () {
          setTimeout(() => {
            document.querySelector('#jsPanel-replacement-container').appendChild(document.querySelector('.languages'))
          }, 0)
        },
        panelSize: {
          width: windowWidth < 768 ? '98vw' : '50vw',
          height: windowWidth < 768 ? '72vh' : '55vh'
        }
      }
    }
  }
}
</script>

<style>
.video-area {
  height: 100%;
}
@media(max-width: 768px) {
  .video-area,
  .video-area iframe {
    height: 62vh;
  }
}
</style>
