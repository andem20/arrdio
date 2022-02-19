import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faPlay, faStop, faCircle, faRepeat } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faPlay, faStop, faCircle, faRepeat)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  data: {
    barAmount: 15,
    barSize: 196,
    bpm: 120,
    grid: 4,
    sampleRate: 44100,
    sizeSlider: HTMLInputElement,
    scale: 0,
    timesignature: "4/4",
    audioClips: []
  },
  render: h => h(App)
}).$mount('#app')
