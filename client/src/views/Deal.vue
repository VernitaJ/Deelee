<template>
  <div>
    <b-img src="/images/Deelee.png" class="center"> </b-img>
    <div class="card-group-deal">
      <div class="card">
        <img
          class="card-imp-top"
          src="https://picsum.photos/600/300/?image=25"
          alt="Card image"
        />
        <div class="card-body-deal">
          <h1 class="card-title">{{ deal.name }}</h1>
          <b-card-sub-title class="mb-2"
            >Offered by
            <a v-bind:href="'/companies/' + deal.company">{{
              deal.company.name
            }}</a></b-card-sub-title
          >
          <div v-for="(tag, index) in deal.tag" v-bind:key="index">
            {{ tag }}
          </div>
          <b-card-sub-title class="mb-2"
            >Added by
            {{
              deal.user.firstName
            }}</b-card-sub-title
          >
          <button v-if="unclicked" class="like-button" @click="addSupport()">
            <b-icon
              icon="hand-thumbs-up"
              font-scale="2"
              variant="success"
            ></b-icon>
          </button>
          <button v-else class="liked-button" @click="removeSupport()">
            <b-icon
              icon="hand-thumbs-up"
              font-scale="2"
              variant="light"
            ></b-icon>
          </button>
          {{ deal.support }}
          <button class="add-button" @click="toggle(!adding)">
            {{ text }}
          </button>
        </div>
        <div v-if="adding">
          <add-review v-bind:adding="adding" v-bind:deal="deal" @toggle="toggle()" />
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
  props: {
    user: Object
  },
  data() {
    return {
      text: 'Add Review',
      adding: false,
      deal: {},
      unclicked: true
    }
  },
  beforeMount() {
    this.getDeal()
    console.log(this.deal)
  },
  methods: {
    getDeal() {
      Api.get('deals/' + this.$route.params.id)
        .then((response) => {
          this.deal = response.data
          console.log('USER', this.deal)
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
          this.$router.push('/')
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
  background-color: transparent;
  border: none;
}
.like-button:hover {
  font-size: 1rem;
}
.liked-button {
  background-color: #085c4d;
  border: none;
}
.card-body-deal {
  background-color: #085c4d;
  color: white;
}
.title {
  margin: 30px 0;
  color: white;
}
.card-group-deal {
  max-width: 800px;
  margin: 5px auto;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
}
.container {
  position: fixed;
  width: 50%;
  height: 70%;
  top: 10vh;
  padding: 10px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  cursor: pointer; /* Add a pointer on hover */
  overflow: auto;
}
.add-button {
  float: right;
  margin: 1em;
  padding: 5px;
  background-color: rgb(80, 138, 134);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
}
</style>
