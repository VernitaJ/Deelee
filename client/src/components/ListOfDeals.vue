<template>
  <div>
    <div v-for="deal in deals" v-bind:key="deal.id" class="deals">
      <div class="card-deals">
        <img
          class="card-img-top-deal"
          src="https://source.unsplash.com/100x80/?deal,food"
          alt="Card image cap"
        />
        <div class="card-body-list">
          <router-link :to="{ name: 'deal', params: { id: deal._id } }"
            >{{ deal.name }}
          </router-link>
          <b-icon
            icon="hand-thumbs-up"
            font-scale="1"
            variant="success"
            class="icon"
          ></b-icon>
          {{ deal.support }}
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
      .then((response) => {
        console.log(response)
        this.deals = response.data
      })
      .catch((error) => {
        this.deals = []
        console.log(error)
      })
  },
  methods: {
    getLink(deal) {
      return '/deals/' + deal._id
    }
  }
}
</script>
<style>
.deals h2 {
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
.deals a {
  text-decoration: none;
}
.deals {
  max-width: 65vh;
  font-size: 1.5em;
  text-align: center;
}
.card-img-top-deal {
  width: 30%;
  margin: 10px auto;
}
.card-deals {
  box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.178);
  padding: 4%;
  border: 2px solid rgb(140, 231, 245);
  color: black;
  margin: 20px;
  background-color: rgba(1, 1, 1, 0.15);
}
.icon {
  margin-left: 30px;
}
.card-body-list {
  color: white;
  margin-left: 20%;
  text-align: left;
}
</style>
