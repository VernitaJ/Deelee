import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import * as VueGoogleMaps from 'vue2-google-maps' // Import package

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCKnjqFtiBq0De7xd5f6mqiFo8oafjlU-E',
    libraries: 'places'
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
