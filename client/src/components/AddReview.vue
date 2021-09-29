<template>
  <div id="container" class="container">
    <h1>Add Review</h1>
    <button type="button" class="close" @click="dealReviewed()">X</button>
    <b-container fluid>
      <b-row class="my-5">
        <b-col sm="2">
          <label for="input-medium"></label>
        </b-col>
          <b-form-rating no border no-border v-model="input.stars" variant="warning" class="mb-2"></b-form-rating>
          {{input.stars}}
      </b-row>

      <b-row class="my-3">
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

      <b-row class="my-3">
        <b-col sm="2">
          <label for="input-medium">Description</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="input-live"
            v-model="input.description"
            :state="descriptionState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Description"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            Enter at least 15 characters
          </b-form-invalid-feedback>
        </b-col>
      </b-row>

    </b-container>
    <button @click="createReview()" ></button>
  </div>
</template>

<script>

import { Api } from '@/Api'
import Review from '../../../server/models/review'

export default {
  computed: {
    titleState() {
      return this.input.title.length > 8
    },
    descriptionState() {
      return this.input.description.length > 15
    }
  },
  name: 'AddReview',
  props: {
    user : String
  },
  components: {
  },
  data() {
    return {
      id: ['615459d91c0e580ba4876f34'],
      review: {},
      deal: {},
      userId: '',
      input: {
        title: '',
        description: '',
        stars: ''
      }
    }
  },

  methods: {
    createObject() {
      console.log(this.deal.company)
      // Add to form data
      this.review = JSON.stringify({
        // purchase: {
        //   user: this.userId,
        //   item: this.deal._id,
        //   company: this.deal.company
        // },
        title: this.input.title,
        description: this.input.description,
        stars: this.input.stars
      })
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
    getTitle() {
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
