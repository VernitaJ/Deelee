<template>
  <div>
    <b-jumbotron header="Users" lead="All the users">
    </b-jumbotron>
  </div>
</template>

<script>

export default {
  name: 'user',
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
