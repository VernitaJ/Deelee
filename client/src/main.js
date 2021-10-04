import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import * as GmapVue from 'gmap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(GmapVue, {
  load: {
    key: process.env.VUE_APP_API_KEY,
    libraries: 'places'
  },
  installComponents: true
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
