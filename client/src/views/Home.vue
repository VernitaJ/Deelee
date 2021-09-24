<template>
  <div>
    <b-jumbotron header="DIT341 Frontend" lead="Welcome to your DIT341 Frontend Vue.js App">
      <b-button class="btn_message" variant="primary" v-on:click="getMessage()" >Get Message from Server</b-button>
      <p>Message from the server:<br/>
      {{ message }}</p>
    </b-jumbotron>
    <add-google-map/>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import AddGoogleMap from '../components/AddGoogleMap.vue'

export default {
  components: { AddGoogleMap },
  name: 'home',
  data() {
    return {
      message: 'none'
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
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
