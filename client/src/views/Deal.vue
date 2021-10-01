<template>
  <div>
    <h1>LIST OF DEALS</h1>
     <div v-for="deal in deals" v-bind:key="deal.id" class="deals">
       <router-link to="/deals/:id">
      <h2>{{ deal.name }}</h2>
       </router-link>
     </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'deals',
  mounted() {
    console.log('Page is loaded!')
    Api.get('deals')
      .then(response => {
        console.log(response)
        this.deals = response.data.deals
      })
      .catch(error => {
        this.deals = []
        console.log(error)
      })
  },
  data() {
    return {
      deals: []
    }
  },
  created() {
    // user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
  }
}
</script>
<style>
.deals h2{
  background: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  margin: 10px auto;
  max-width: 600px;
  cursor: pointer;
  color: #444;
}
.deals h2:hover {
  background: #ddd;
}
.deals a{
  text-decoration: none;
}
</style>
