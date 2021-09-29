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
            v-model="input.title"
            :state="titleState"
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
import Review from '../../../server/models/review'

export default {
  computed: {
    titleState() {
      return this.input.title.length > 8
    }
  },
  name: 'AddReview',
  components: {
  },
  data() {
    return {
      id: ['615357a4220b2a0f1c2c9967'],
      review: {},
      deal: {},
      userId: '',
      input: {
        title: '',
        date: '',
        stars: ''
      }
    }
  },

  methods: {
    createObject() {
      this.review = new Review()

      // Add to form data
      this.review.append('user', this.userId)
      this.review.append('company', this.deal.company)
      this.review.append('deal', this.deal.name)
      this.review.append('title', this.input.title)
      this.review.append('date', this.input.date)
      this.review.append('stars', this.input.stars)
      console.log('Object created: ' + this.review)
    },
    createReview() {
      this.createObject()
      Api.post('/reviews', this.review)
        .then(response => {
          console.log('Review submitted successfully')
        })
        .catch(error => {
          console.log('Submission failed: ' + error)
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
      console.log(this.input.title)
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
