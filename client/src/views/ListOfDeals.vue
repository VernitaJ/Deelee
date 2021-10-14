<template>
  <div>
    <h4>Deals</h4>
     <div v-for="deal in deals" v-bind:key="deal.id" class="deals">
         <div class="card-deals">
            <img
            class="card-img-top-deal"
            src="https://source.unsplash.com/random/80x50/?img=1"
            alt="Card image cap"
          />
          <div class="card-body-list">
            <h5 class="card-title">{{ deal.name }}</h5>
            <p class="card-text">{{ deal.support }}</p>
          </div>
         </div>
     </div>
     </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'deals',
  data() {
    return {
      deals: {},
      value: null
    }
  },
  mounted() {
    console.log('Page is loaded!')
    Api.get('companies/' + this.$route.params.id + '/deals')
      .then(response => {
        console.log(response)
        this.deals = response.data
      })
      .catch(error => {
        this.deals = []
        console.log(error)
      })
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
.deals {
  max-width: 80%;
  font-size: 1.5em;
  margin: 10px auto;
  text-align: center;
}
.card-img-top-deal {
  width: 30%;
  margin: 10px auto;
}
.card-deals {
  box-shadow: 0 10px 8px 0 rgba(255, 255, 255, 0.178);
  transition: 0.3s;
  padding: 2%;
  border: 2px solid green;
  color: black;
  margin: 20px;
  background-color: white;
}
.card-body-list {
  background-color: white;
  color: black;
  text-align: left;
}
</style>
