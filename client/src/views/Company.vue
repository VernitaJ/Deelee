<template>
    <div>
    <view-company />
    </div>
</template>

<script>
import ViewCompany from '../components/ViewCompany.vue'

export default {
  components: { ViewCompany },
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
