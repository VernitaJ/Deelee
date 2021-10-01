<template>
  <div>
    <h4>Reviews for company {{company}}</h4>

     <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="loaded" class="success">
            <div v-for="review in reviews" v-bind:key="review._id">
                <h4>{{review.title}}</h4>
                <img src="https://source.unsplash.com/random/80x50/?img=1"/>
                <p>{{review.description}}</p>
             </div>
    </div>

  </div>
</template>

<script>

import { Api } from '@/Api'

export default {
  name: 'Reviews',
  props: 'company',
  mounted() {
    this.getReviews()
  },
  data() {
    return {
      id: ['61547c299aeda447b87cbf11'],
      deal: {},
      loading: false,
      loaded: false,
      preview: false,
      reviews: []
    }
  },
  methods: {
    getReviews() {
      this.loading = true
      Api.get('/reviews')
        .then(response => {
          this.reviews = response.data.reviews
        })
        .catch(error => {
          this.message = error
        })
      console.log(this.reviews)
      this.loading = false
      this.loaded = true
    }
  }
}

</script>

<style scoped>
.aform{
margin-left: auto;
width: 60%;
}
</style>
