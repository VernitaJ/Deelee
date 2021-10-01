<template>
  <div>
    <addDeal />
  </div>
</template>

<script>

import addDeal from '../components/addDeal.vue'

export default {
  components: { addDeal },
  name: 'Deals',
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
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
