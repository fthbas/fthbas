<template>
  <div id="app">
    <JsPanel :visible="show" :options="options01" @close="show = false">
      <div class="speakers">
        <div class="hero">
          3. Kongre Konuşmacıları
        </div>
        <div class="list">
          <ul>
            <li>
              <img src="http://placehold.it/55x55" alt="" />
              <div class="name">Hakan Taşıyan</div>
              <div class="label">Müzisyen</div>
            </li>
            <li>
              <img src="http://placehold.it/55x55" alt="" />
              <div class="name">Fazıl Say</div>
              <div class="label">Sanatçı</div>
            </li>
            <li>
              <img src="http://placehold.it/55x55" alt="" />
              <div class="name">Hakan Taşıyan</div>
              <div class="label">Müzisyen</div>
            </li>
            <li>
              <img src="http://placehold.it/55x55" alt="" />
              <div class="name">Fazıl Say</div>
              <div class="label">Sanatçı</div>
            </li>
            <li>
              <img src="http://placehold.it/55x55" alt="" />
              <div class="name">Hakan Taşıyan</div>
              <div class="label">Müzisyen</div>
            </li>
            <li>
              <img src="http://placehold.it/55x55" alt="" />
              <div class="name">Fazıl Say</div>
              <div class="label">Sanatçı</div>
            </li>
          </ul>
        </div>
      </div>
    </JsPanel>
  </div>
</template>

<script>
export default {
  name: 'SpeakersScreen',
  data () {
    const windowWidth = window.screen.width
    return {
      show: true,
      options01: {
        animateIn: 'animated zoomIn faster',
        animateOut: 'animated zoomOut faster',
        headerTitle: 'Konuşmacılar',
        theme: 'dark',
        position: windowWidth < 768 ? 'left-top 1vw 1vh' : 'left-top 1vw 1vh',
        headerLogo: '<i class="fas fa-volume-up"></i>',
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
.speakers {
  padding: 20px;
}
.speakers .hero {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #576490;
}
.speakers ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.speakers li {
  position: relative;
  margin-top: 15px;
  padding-top: 7px;
  padding-left: 65px;
  min-height: 55px;
}
.speakers li:first-child {
  margin-top: 0;
}
.speakers li img {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 100%;
}
.speakers li .name {
  font-size: 14px;
}
.speakers li .label {
  margin-top: 5px;
  font-size: 12px;
  font-weight: 300;
}
</style>
