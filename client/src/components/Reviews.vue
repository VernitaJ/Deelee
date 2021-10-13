<template>
  <div>
    <h4>Reviews</h4>

     <div v-if="loading" class="loading">
      {{text}}
    </div>

    <div v-if="loaded" class="success">
      <div class="card">
            <div v-for="review in reviews" v-bind:key="review.id">
                <img src="https://source.unsplash.com/random/80x50/?img=1" class="picture"/>
                <p>{{review.title}}</p>
                <p>{{review.description}}</p>
                <button v-if="review.user === user">Update</button>
    <div>
       <b-form-rating v-model="value"></b-form-rating>
       <p class="mt-2">Value: {{ value }}</p>
    </div>
             </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Api } from '@/Api'

export default {
  name: 'Reviews',
  props: {
    user: String
  },
  beforeMount() {
    this.getReviews()
  },
  data() {
    return {
      text: 'Loading',
      loading: true,
      loaded: false,
      reviews: [],
      value: null
    }
  },
  methods: {
    getReviews() {
      Api.get('companies/' + this.$route.params.id + '/reviews')
        .then(response => {
          console.log(response.data)
          this.reviews = response.data
        })
        .then(response => {
          if (this.reviews.length > 0) {
            this.loading = false
            this.loaded = true
          } else this.text = 'No reviews have been added yet. Be the first!'
        })
        .catch(error => {
          this.message = error
          console.log(error)
        })
    }
  }
}

</script>

<style scoped>
.aform{
margin-left: auto;
width: 60%;
}
.success {
 max-width: 80%;
 font-size: 1.5em;
  margin: 10px auto;
  text-align: left;
}
.card {
box-shadow: 0 10px 8px 0 rgba(255, 255, 255, 0.178);
transition: 0.3s;
padding: 2%;
border: 2px solid green;
color: black;
}
.card:hover {
   box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.2);
}
.picture {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}
</style>
