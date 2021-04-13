<template>
  <div id="app">
    <JsPanel :visible="show" :options="options01" @close="show = false">
      <div class="survey">
        <div class="hero">Anket seçiminizi yapın.</div>
        <div class="survey-question">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </div>
        <form>
          <ul>
            <li>
              <label>
                <input type="radio" name="survey" />
                <div class="radio"><span></span></div>
                There are many variations of passages of Lorem.
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="survey" />
                <div class="radio"><span></span></div>
                Latin literature from 45 BC, making it over 2000 years old.
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="survey" />
                <div class="radio"><span></span></div>
                There are many variations of passages of Lorem.
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="survey" />
                <div class="radio"><span></span></div>
                Latin literature from 45 BC.
              </label>
            </li>
          </ul>
          <button type="submit">Gönder</button>
        </form>
      </div>
    </JsPanel>
  </div>
</template>

<script>
export default {
  name: 'SurveyScreen',
  data () {
    const windowWidth = window.screen.width
    return {
      show: true,
      options01: {
        animateIn: 'animated zoomIn faster',
        animateOut: 'animated zoomOut faster',
        headerTitle: 'Anket',
        theme: 'dark',
        position: windowWidth < 768 ? 'left-top 1vw 1vh' : 'left-bottom 1vw -1vh',
        headerLogo: '<i class="fas fa-clipboard-list"></i>',
        panelSize: {
          width: windowWidth < 768 ? '98vw' : '32vw',
          height: windowWidth < 768 ? '72vh' : '40vh'
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
.survey {
  padding: 20px;
}
.survey .hero {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #576490;
}
.survey .survey-question {
  font-size: 14px;
  line-height: 18px;
  opacity: .7;
}
.survey ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.survey ul li {
  position: relative;
  padding-left: 30px;
  margin-top: 15px;
  font-size: 14px;
  line-height: 18px;
}
.survey ul li input {
  opacity: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  position: absolute;
}
.survey ul li .radio {
  position: absolute;
  left: 0;
  top: 50%;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #fff;
  border: solid 2px #ccc;
  border-radius: 100%;
  margin-right: 5px;
  transform: translateY(-50%);
  transition: all .3s linear;
}
.survey ul li input + .radio span {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: 3px;
  top: 50%;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: #576490;
  transform: translateY(-50%);
  transition: all .3s linear;
}
.survey ul li input:checked + .radio span {
  opacity: 1;
  visibility: visible;
}
.survey label {
  cursor: pointer;
}
.survey button {
  cursor: pointer;
  display: inline-block;
  padding: 10px 15px;
  margin-top: 15px;
  color: #fff;
  font-weight: 700;
  border: transparent;
  background: #576490;
  outline: none;
  border-radius: 5px;
  transition: all .3s linear;
}
.survey button:hover {
  background: #000;
}
</style>
