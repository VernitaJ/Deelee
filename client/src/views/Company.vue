<template>
    <div>
    <companies/>
    </div>
</template>

<script>
import companies from '../components/Companies.vue'

export default {
  components: { companies },
  name: 'Company',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
  }
}
</script>
