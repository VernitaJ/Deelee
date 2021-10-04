<template>
  <div>
    <b-card
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    style="max-width: 35rem;"
    class="mb-2"
  >
    <b-card-body>
      <b-card-title>{{deal.name}}</b-card-title>
      <b-card-sub-title class="mb-2">Offered by {{deal.company.name}}</b-card-sub-title>
      <div v-for="(tag, index) in deal.tag" v-bind:key="index">
        {{tag}}
      </div>
    <b-card-text>
      {{deal.support}}
    </b-card-text>
    <button class="like-button" @click="addSupport()">
    <b-icon icon="check2-circle" scale="2" variant="success"></b-icon>
    </button>
    </b-card-body>
  </b-card>
      <button @click="delDeal()">DELETE</button>
      <div>
      </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'deal',
  data() {
    return {
      deal: {}
    }
  },
  mounted() {
    this.getDeal()
  },
  methods: {
    getDeal() {
      Api.get('deals/' + this.$route.params.id)
        .then(response => {
          console.log(response.data)
          this.deal = response.data
        })
        .catch(error => {
          this.deal = {}
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
.btn_message {
  margin-bottom: 1em;
}
.like-button {
  background-color: white;
  border: none;
}
</style>
