<template>
  <div>
    <b-img src="/images/Deelee.png" class="center"> </b-img>
    <!-- <show-company /> -->
    <div class="reviews">
      <reviews v-bind:user="user.id"/>
    </div>
  </div>
</template>

<script>
// import ShowCompany from '../components/getCompany.vue'
import Reviews from '../components/Reviews.vue'

export default {
  components: { Reviews },
  name: 'Company',
  props: {
    user: Object
  },
  data() {
    return {
      message: ''
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
