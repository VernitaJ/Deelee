<template>
  <div>
    <b-jumbotron header="Users" lead="All the users">
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'user',
  data() {
    return {
      message: 'none'
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
