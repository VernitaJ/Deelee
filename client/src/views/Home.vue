<template>
  <div>
    <b-jumbotron header="Deelee" lead="Find or Share">
    </b-jumbotron>
    <google-map v-bind:deals="deals" @toggle="toggle()"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import GoogleMap from '../components/Maps.vue'

export default {
  components: { GoogleMap },
  name: 'home',
  data: () => ({
    message: 'this is working',
    deals: [],
    user: {}
  }),
  mounted() {
    this.getDeals()
  },
  // created() {
  //   // user is not authorized
  //   if (localStorage.getItem('token') === null) {
  //     this.$router.push('/login')
  //   }
  // },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    getDeals() {
      Api.get('/deals')
        .then(response => {
          this.deals = response.data.deals
        })
        .catch(error => {
          this.message = error
        })
      console.log(this.deals)
    },
    logout() {
      localStorage.clear()
      this.$router.push('/login')
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
