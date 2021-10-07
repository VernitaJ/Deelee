<template>
  <div>
    <div class= "contact">
      <div class= "name">
      <b-icon icon="briefcase-fill" font-scale="2"></b-icon>
      <h2> {{ company.name }} </h2>
      <span
      @mouseover="hover = true"
      @mouseleave="hover = false">
      <b-icon icon="geo-alt-fill" font-scale="2"></b-icon>
    </span>
    <span v-if="hover">  <h2> {{ company.address.street }} </h2> </span>
    <span v-if="hover">  <h2> {{ company.address.postcode }} </h2> </span>
      </div>
      <div class= "detail">
      <b-icon icon="envelope-fill" font-scale="2"></b-icon>
      <h2> {{ company.contact.email }} </h2>
      <b-icon icon="telephone-fill" font-scale="2"></b-icon>
      <h2> {{ company.contact.phone }} </h2>
       <b-icon icon="tag-fill" font-scale="2"></b-icon>
      <h2> {{ company.category }} </h2>
      </div>
      </div>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'getcompany',
  data() {
    return {
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

      },
      hover: false
    }
  },
  mounted() {
    Api.get('companies/' + this.$route.params.id)
      .then(response => {
        console.log(response.data.company)
        this.company = response.data
      })
      .catch(error => {
        this.company = []
        console.log(error)
      })
  }
}

</script>
<style>
form {
   max-width: 800px;
   margin: 30px auto;
   background: rgb(198, 204, 204);
   text-align: left;
   padding: 40px;
   border-radius: 10px;
 }
 label {
   color:black;
   display: inline-block;
   margin: 25px 0 15px;
   font-size: 0.9em;
   text-transform: uppercase;
   box-sizing: border-box;
   border-bottom: 1px solid black;
   color: #555;
 }
 .input {
   display: block;
   padding: 15px 10px;
   width: 100%;
   box-sizing: border-box;
   border: none;
   border-bottom: 1px solid black;
   color: #555;
 }

 .contact {
   width: 80%;
   margin: 5px auto;
   background:#0A0909;
   padding: 25px;
   border-radius: 10px;
   color: white;
 }
 .detail{
  text-align: right;
 }
 .name {
  text-align: left;
 }
</style>
