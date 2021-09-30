<template>
  <div>
    <addDeal />
  </div>
</template>

<script>

import addDeal from '../components/addDeals.vue'

export default {
  components: { addDeal },
  name: 'Deals',
  data() {
    return {
      message: 'none'
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
