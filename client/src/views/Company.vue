<template>
  <div>
    <b-img src="/images/Deelee.png" class="center"> </b-img>
    <companies v-bind:company="company" />
    <div class="data">
      <div class="card-deck">
        <div class="card-body">
          <h4>Reviews</h4>
          <reviews v-bind:user="user.id" />
        </div>
        <div class="card-body">
          <h4>Deals</h4>
          <deals />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import companies from '../components/getCompany.vue'
import reviews from '../components/Reviews.vue'
import deals from '../views/ListOfDeals.vue'

export default {
  components: { companies, reviews, deals },
  name: 'CompanyPage',
  props: {
    user: Object
  },
  data() {
    return {
      message: 'none',
      company: {
        name: '',
        address: {
          street: '',
          number: '',
          postcode: '',
          city: ''
        },
        contact: {
          email: '',
          phone: ''
        },
        category: '',
        deals: '',
        reviews: ''
      }
    }
  },
  mounted() {
    this.getcompany()
  },
  methods: {
    getcompany() {
      Api.get('companies/' + this.$route.params.id)
        .then((response) => {
          this.company = response.data
        })
        .catch((error) => {
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
.data {
  max-width: 93%;
  margin: 10px auto;
  text-align: center;
  border-radius: 5px;
}
</style>
