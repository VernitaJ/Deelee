<template>
    <div>
        <h4>{{company.name}}</h4>
        <h2>hi</h2>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default ({
  name: 'ViewCompany',
  data() {
    return {
      company: {}
    }
  },
  mounted() {
    this.getCompany()
  },
  methods: {
    getCompany() {
      Api.get('/companies/' + this.$route.params.id)
        .then(response => {
          this.company = response.data
          console.log(this.company)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
</script>
