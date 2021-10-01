<template>
  <div>
    <h1> SELECTED DEAL</h1>
    <p>The Deal id is {{$route.params.id}}</p>
      <h2>{{ deal.name }} </h2>
      <h2>{{ deal.tag }} </h2>
      <h2>{{ deal.support }} </h2>
      <h2>{{ deal.company }} </h2>
      <button @click="getDeal()">GET</button> |
      <button @click="delDeal()">DELETE</button>
      <div>
      <updDeal />
      </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import updDeal from '../components/updateDeal.vue'

export default {
  components: { updDeal },
  name: 'deal',
  data() {
    return {
      deal: {}
    }
  },
  created() {
    // user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
  },
  methods: {
    getDeal() {
      Api.get('deals/' + this.$route.params.id)
        .then(response => {
          console.log(response.data)
          this.deal = response.data
        })
        .catch(error => {
          this.deal = []
          console.log(error)
        })
    },
    delDeal() {
      Api.delete('deals/' + this.$route.params.id)
        .then(response => {
          console.log(response.data)
          this.$router.push('/deal')
        })
        .catch(error => {
          console.log(error)
        })
    },
    update() {
      this.$router.push('/updatedeals')
    }
  }
}
</script>
<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
