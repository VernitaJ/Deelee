<template>
  <div>
    <b-jumbotron header="Users" lead="All the users">
    </b-jumbotron>
    <reviews v-bind:company="company"/>
  </div>
</template>

<script>
import Reviews from '../components/Reviews.vue'

export default {
  components: { Reviews },
  name: 'user',
  company: 'abc company',
  data() {
    return {
      message: 'none'
    }
  },
  created() {
    // user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
  },
  methods: {
    getUser() {
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
