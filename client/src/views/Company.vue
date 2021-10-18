<template>
  <div>
    <b-img src="/images/Deelee.png" class="logo"> </b-img>
    <companies v-bind:company="company" />
    <div class="data">
      <div class="card-deck">
        <div class="card-body">
          <h2>Reviews</h2>
          <reviews v-bind:user="user.id" />
        </div>
        <div class="card-body">
          <h2>Deals</h2>
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
import deals from '../components/ListOfDeals.vue'

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
.logo {
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
div h2 {
  margin: 40px;
  color: rgb(51, 221, 213);
}

@media only screen and (min-device-width: 360px) and (max-device-height: 768px) and (-webkit-device-pixel-ratio: 3) {
  .logo {
    width: 30%;
    height: auto;
  }
}
</style>
