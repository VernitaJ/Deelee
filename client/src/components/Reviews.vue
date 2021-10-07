<template>
  <div>
    <h4>Reviews {{company}}</h4>

     <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="loaded" class="success">
      <div class="card">
            <div v-for="review in reviews" v-bind:key="review._id">
                <img src="https://source.unsplash.com/random/80x50/?img=1" class="picture"/>
                <p>{{review.title}}</p>
                <p>{{review.description}}</p>
             </div>
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
.success {
 max-width: 80%;
 font-size: 1.5em;
  margin: 10px auto;
  text-align: left;
}
.card {
box-shadow: 0 10px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
padding: 2%;
border: 5px solid green;
}
.card:hover {
   box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.picture {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}
</style>
