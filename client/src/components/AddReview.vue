<template>
  <div id="container" class="container">
    <h1>Add Review</h1>
    <button type="button" class="close" @click="dealReviewed()">X</button>
    <b-container fluid>
      <b-row class="my-4">
        <b-col sm="2">
          <label for="input-medium">Title</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="input-live"
            v-model="name"
            :state="nameState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Review title"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            Enter at least 8 letters
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
    </b-container>
    <button @click="getName()" ></button>
  </div>
</template>

<script>

import { Api } from '@/Api'

export default {
  computed: {
    nameState() {
      return this.name.length > 8
    }
  },
  name: 'AddReview',
  components: {
  },
  data() {
    return {
      id: ['615357a4220b2a0f1c2c9967'],
      deal: {},
      name: ''
    }
  },

  methods: {
    createReview() {
      Api.post('/reviews')
        .then(response => {
          this.review = response.data.review
        })
        .catch(error => {
          this.message = error
        })
      console.log(this.review)
    },
    dealReviewed() {
      Api.get(`/deals/${this.id}`)
        .then(response => {
          this.deal = response.data
        })
        .catch(error => {
          this.message = error
        })
      console.log(this.deal)
    },
    getName() {
      console.log(this.name)
    }
  },

  mounted() {
    this.dealReviewed()
  }
}

</script>

<style scoped>
.aform{
margin-left: auto;
width: 60%;
}
</style>
