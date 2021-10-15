<template>
  <div>
    <google-map v-bind:deals="deals" v-bind:user="user.id" @toggle="toggle()" />
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import GoogleMap from '../components/Maps.vue'

export default {
  components: { GoogleMap },
  name: 'home',
  props: {
    user: Object
  },
  data: () => ({
    message: 'this is working',
    deals: []
  }),
  mounted() {
    this.getDeals()
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then((response) => {
          this.message = response.data.message
        })
        .catch((error) => {
          this.message = error
        })
    },
    getDeals() {
      Api.get('/deals')
        .then((response) => {
          this.deals = response.data.deals
        })
        .catch((error) => {
          console.log(error)
        })
      console.log(this.deals)
    },
    toggle() {
      this.getDeals()
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
