<template>
  <div>
    <b-jumbotron header="DIT341 Frontend" lead="Welcome to your DIT341 Frontend Vue.js App">
      <b-button class="btn_message" variant="primary" v-on:click="getDeals()" >Get Message from Server</b-button>
      <p>Message from the server:<br/>
      {{ message }}</p>
      <button @click="logout">logout</button>
       <ul v-for="deal in deals" :key="deal.name">
      {{ deal.name }}
  </ul>
    </b-jumbotron>
    <google-map v-bind:deals="deals"/>
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
    deals: []
  }),
  created() {
    // user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
  },
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
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
