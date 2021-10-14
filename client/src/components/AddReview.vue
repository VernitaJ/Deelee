<template>
  <div id="container" class="container">
    <h4 class="title">Add Review</h4>
    <button type="button" class="close" @click="cancelReview()">Cancel</button>
    <b-container fluid>
      <b-row class="my-3">
        <b-form-rating
          no-border
          v-model="input.stars"
          variant="warning"
          class="mb-4 bg-transparent"
        ></b-form-rating>
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
    <button class="preview-button" @click="togglePreview()">Preview</button>
    <div v-show="preview">
      <b-card
        no-body
        style="max-width: 20rem"
        img-src="https://cdn.winsightmedia.com/platform/files/public/600x450/culinary-competition-winner-food-rb-slide.jpg"
        img-alt="Image"
        img-top
      >
        <b-card-body>
          <b-card-title>{{ input.title }}</b-card-title>
          <b-card-sub-title class="mb-2">{{ user.firstName }}</b-card-sub-title>
          <b-card-text>
            {{ input.description }}
          </b-card-text>
        </b-card-body>
        <b-button  class = "button-reviews" href="#"  @click="createReview()"
          >Post Review</b-button
        >
      </b-card>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

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
    user: Object,
    deal: Object
  },
  components: {},
  data() {
    return {
      company: this.$route.params.id,
      review: {},
      preview: false,
      input: {
        title: '',
        description: '',
        stars: ''
      }
    }
  },
  methods: {
    togglePreview() {
      if (this.input.title.length > 8 && this.input.description.length > 15) {
        this.preview ? (this.preview = false) : (this.preview = true)
      } else alert('Please complete all the fields')
    },
    createReview() {
      const newReview = {
        purchase: {
          user: this.user.id,
          item: this.deal.name,
          company: this.deal.company.name
        },
        title: this.input.title,
        description: this.input.description,
        stars: this.input.stars
      }
      Api.post('/companies/' + this.deal.company._id + '/reviews', newReview)
        .then((response) => {
          console.log(response)
          this.$emit('toggle', false)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    cancelReview() {
      this.$emit('toggle', false)
    },
    getTitle() {
      console.log(this.input.title)
    }
  }
}
</script>

<style scoped>
.aform {
  margin-left: auto;
  width: 60%;
}
.close {
  color: rgb(255, 255, 255);
  font-weight: 200;
  margin-right: 20px;
  font-style: normal;
}
.preview-button {
  border: none;
  border-radius: 10px;
  background-color: aqua;
  color: white;
}
.close:hover {
  color: white;
}
.card{
  margin: 30px auto;
  text-align: center;
  padding: 15px;
  border-radius: 10px;
  background-color: #343633;
  border-color: green;
  opacity: 95%;
  margin-left: 1%;
}
.button-reviews {
 background-color:#258a74;
}
.container {
  background-color: #343633;
  opacity: 95%;
}
</style>
