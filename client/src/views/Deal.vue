<template>
  <div>
    <div class="card-group-deal">
      <div class="card">
        <img
          class="card-img-right"
          src="https://source.unsplash.com/400x250/?food"
          alt="Card image"
        />
        <div class="card-body-deal">
          <h3 class="card-title">{{ deal.name }}</h3>
          <b-card-sub-title class="mb-2"
            >Offered by
            <a v-bind:href="'/companies/' + deal.company._id">{{
              deal.company.name
            }}</a></b-card-sub-title
          >
          <div v-for="(tag, index) in deal.tag" v-bind:key="index">
            {{ tag }}
          </div>
          <b-card-sub-title class="mb-2"
            >Added by {{ deal.user.firstName || '' }}</b-card-sub-title
          >
          <b-card-text class="mb-2"> {{ deal.description }} </b-card-text>
          <button v-if="unclicked" class="like-button" @click="addSupport()">
            <b-icon
              icon="hand-thumbs-up"
              font-scale="2"
              variant="warning"
            ></b-icon>
          </button>
          <button v-else class="liked-button" @click="removeSupport()">
            <b-icon
              icon="hand-thumbs-up"
              font-scale="2"
              variant="success"
            ></b-icon>
          </button>
          {{ deal.support }}
          <button class="add-button" @click="toggle(!adding)">
            {{ text }}
          </button>
        </div>
        <div v-if="adding">
          <add-review
            v-bind:adding="adding"
            v-bind:user="user"
            v-bind:deal="deal"
            @toggle="toggle()"
          />
        </div>
      </div>
    </div>
    <button
      class="delete-button"
      v-if="user.id === deal.user._id"
      @click="delDeal()"
    >
      DELETE
    </button>
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
.logo {
  width: 10%;
  height: auto;
}
.like-button {
  background-color: transparent;
  border: none;
}
.like-button:hover {
  font-size: 1.1rem;
}
.liked-button {
  border: none;
  background-color: #131d22;
}
.card-body-deal {
  padding: 3%;
  padding-top: 5%;
  background-color: #111a20ea;
  color: white;
  border: 2px solid #085c4d;
  border-radius: 10px;
}
.card-img-top {
  border-radius: 15px;
}
.card-group-deal {
  position: relative;
  max-width: 75vh;
  margin: 20px auto;
  text-align: center;
  padding: 10px;
  border-radius: 30px;
}
.card-title {
  padding-bottom: 2%;
}
.add-button {
  float: right;
  margin: 1em;
  padding: 5px;
  background-color: rgb(21, 173, 163);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
}
.mb-2 {
  color: white;
}
.delete-button {
  padding: 5px;
  background-color: rgb(80, 138, 134);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
}
</style>
