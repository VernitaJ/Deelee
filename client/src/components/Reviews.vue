<template>
  <div>
    <div v-if="loading" class="loading">
      {{ text }}
    </div>
    <div v-if="loaded" class="success">
      <div v-for="review in reviews" v-bind:key="review.id">
        <div class="card-reviews">
          <img
            class="card-img-top"
            src="https://source.unsplash.com/random/80x50/?img=1"
            alt="Card image cap"
          />
          <div class="card-body-list">
            <b-form-rating
              id="rating-md-no-border"
              variant="warning"
              v-model="review.stars"
              no-border
            ></b-form-rating>
            <h5 class="card-title">{{ review.title }}</h5>
            <p class="card-text">{{ review.description }}</p>
          </div>
          <button v-if="review.user === user">Update</button>
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
        .then((response) => {
          console.log(response.data)
          this.reviews = response.data
        })
        .then((response) => {
          if (this.reviews.length > 0) {
            this.loading = false
            this.loaded = true
          } else this.text = 'No reviews have been added yet. Be the first!'
        })
        .catch((error) => {
          this.message = error
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.success {
  max-width: 80%;
  font-size: 1.5em;
  margin: 10px auto;
  text-align: center;
}
.card-reviews {
  box-shadow: 0 2px 2px 0 rgba(255, 255, 255, 0.178);
  transition: 0.3s;
  padding: 2%;
  border: 2px solid rgb(27, 167, 185);
  color: black;
  margin: 20px;
  background-color: rgba(1, 1, 1, 0.2);
}
.card:hover {
  box-shadow: 0 3px 3px 0 rgba(255, 255, 255, 0.2);
}
.picture {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}
.card-body {
  background-color: rgba(255, 255, 255, 0.178);
  color: black;
  text-align: left;
}
.card-img-top {
  width: 30%;
  margin: 10px auto;
}
</style>
