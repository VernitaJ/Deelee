import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import * as GmapVue from 'gmap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(GmapVue, {
  load: {
    key: process.env.VUE_APP_API_KEY,
    libraries: 'places'
  },
  installComponents: true
})

const InfoWindowButton = Vue.extend({
  template:
    '<button type="button" @click="infoWindowButtonClicked()">This is a button</button></div>',
  methods: {
    infoWindowButtonClicked: function() {
      Event.fire('infoWindowButtonClicked')
    }
  }
})

Event.fire('infoWindowButton', new InfoWindowButton().$mount())

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
