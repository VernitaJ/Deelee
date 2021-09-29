<template>
  <div id="container" class="container">
    <h4>Add Review</h4>
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
    <button @click="togglePreview()" ></button>
    <div v-show='preview' >
     <b-card
    no-body
    style="max-width: 20rem;"
    img-src="https://cdn.winsightmedia.com/platform/files/public/600x450/culinary-competition-winner-food-rb-slide.jpg"
    img-alt="Image"
    img-top
  >
    <b-card-body>
      <b-card-title>{{input.title}}</b-card-title>
      <b-card-sub-title class="mb-2">{{reviewer}}</b-card-sub-title>
      <b-card-text>
        {{input.description}}
      </b-card-text>
    </b-card-body>
    <b-button href="#" variant="primary" @click="createReview()">Post Review</b-button>
  </b-card>
    </div>
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
      id: ['61547c299aeda447b87cbf11'],
      review: {},
      deal: {},
      preview: false,
      reviewer: 'Jenny',
      input: {
        title: '',
        description: '',
        stars: ''
      }
    }
  },

  methods: {
    togglePreview(){
      this.preview ? this.preview = false : this.preview = true
    },
    async createReview() {
      // POST request using fetch with async/await
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          purchase: {
            user: this.reviewer,
            item: this.deal.name,
            company: this.deal.company
          },
          title: this.input.title,
          description: this.input.description,
          stars: this.input.stars })
      };
      const response = await fetch("http://localhost:3000/api/reviews", requestOptions);
      const data = await response.json();
      this.postId = data.id;
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
