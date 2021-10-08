<template>
  <div>
    <b-img src="/images/Deelee.png" class="center"> </b-img>
    <companies />
    <div class="reviews">
      <reviews />
    </div>
  </div>
</template>

<script>
import companies from '../components/getCompany.vue'
import reviews from '../components/Reviews.vue'

export default {
  components: { companies, reviews },
  name: 'Company',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {}
}
</script>
<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 20%;
  width: 15%;
}
.reviews {
  max-width: 93%;
  margin: 30px auto;
  background: #343633;
  text-align: left;
  padding: 20px;
  border-radius: 5px;
  color: white;
}
</style>
