<template>
  <div>
    <add-review>
    </add-review>
  </div>
</template>

<script>
// @ is an alias to /src

import AddReview from '../components/AddReview.vue'

export default {
  components: { AddReview },
  name: 'Review',
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
