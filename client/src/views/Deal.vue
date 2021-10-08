<template>
  <div>
    <b-img src="/images/Deelee.png" class="center"> </b-img>
    <div class="card-group-deal">
      <div class="card">
        <img
          class="card-imp-top"
          src="https://picsum.photos/600/300/?image=25"
          alt="Crad image"
        />
        <div class="card-body-deal">
          <h1 class="card-title">{{ deal.name }}</h1>
          <b-card-sub-title class="mb-2"
            >Offered by
            <a v-bind:href="'/companies/' + deal.company._id">{{
              deal.company.name
            }}</a></b-card-sub-title
          >
          <div v-for="(tag, index) in deal.tag" v-bind:key="index">
            {{ tag }}
          </div>
          <button v-if="unclicked" class="like-button" @click="addSupport()">
            <b-icon
              icon="hand-thumbs-up"
              font-scale="2"
              variant="success"
            ></b-icon>
          </button>
          <button v-else class="like-button" @click="removeSupport()">
            <b-icon
              icon="hand-thumbs-up"
              font-scale="2"
              variant="success"
            ></b-icon>
          </button>
          {{ deal.support }}
        </div>
        <button @click="toggle(!adding)">{{ text }}</button>
        <div v-if="adding">
          <add-review v-bind:adding="adding" @toggle="toggle()" />
        </div>
        <button @click="delDeal()">DELETE</button>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import AddReview from '../components/AddReview.vue'

export default {
  components: { AddReview },
  name: 'deal',
  data() {
    return {
      text: 'Add Review',
      adding: false,
      deal: {},
      unclicked: true
    }
  },
  mounted() {
    this.getDeal()
  },
  methods: {
    getDeal() {
      Api.get('deals/' + this.$route.params.id)
        .then((response) => {
          console.log(response.data)
          console.log(localStorage)
          this.deal = response.data
        })
        .catch((error) => {
          this.deal = {}
          console.log(error)
        })
    },
    delDeal() {
      Api.delete('deals/' + this.$route.params.id)
        .then((response) => {
          console.log(response.data)
          this.$router.push('/deal')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addSupport() {
      this.unclicked = false
      const updateSupport = { support: this.deal.support + 1 }
      Api.patch('/deals/' + this.$route.params.id, updateSupport)
        .then((response) => {
          this.getDeal()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    update() {
      this.$router.push('/updatedeals')
    },
    toggle(value) {
      this.text === 'Add Review'
        ? (this.text = 'Cancel')
        : (this.text = 'Add Review')
      this.adding = value
    },
    removeSupport() {
      this.unclicked = true
      const updateSupport = { support: this.deal.support - 1 }
      Api.patch('/deals/' + this.$route.params.id, updateSupport)
        .then((response) => {
          this.getDeal()
        })
        .catch((error) => {
          console.log(error)
        })
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
.like-button {
  background-color: #085c4d;
  border: none;
}
.card-body-deal {
  background-color: #085c4d;
  color: white;
}
.card-group-deal {
  max-width: 800px;
  margin: 5px auto;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
}
</style>
