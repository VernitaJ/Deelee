<template>
  <div>
    <b-img src="/images/Deelee.png" class="center"> </b-img>
    <companies v-bind:company="company" />
    <div class="reviews">
      <reviews v-bind:user="user.id"/>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import companies from '../components/getCompany.vue'
import reviews from '../components/Reviews.vue'

export default {
  components: { companies, reviews },
  name: 'CompanyPage',
  data() {
    return {
      message: 'none',
      company: []
    }
  },
  mounted() {
    this.getcompany()
  },
  methods: {
    getcompany() {
      Api.get('companies/' + this.$route.params.id)
        .then((response) => {
          console.log(response.data.company)
          this.company = response.data
        })
        .catch((error) => {
          this.company = []
          console.log(error)
        })
    }
  }
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
