<template>
<div>
  <h1>ADD COMPANY</h1>

<form @submit.prevent="createCompany">

  <div class ="form">
    <label> COMPANY NAME </label>
    <input type="text" class="form-control" v-model="name" placeholder="name"/>
  </div>

<div class ="form">
    <label> COMPANY ADDRESS </label>
    <input type="text" class="form-control" v-model="address.street" placeholder="street"/>
     <input type="text" class="form-control" v-model="address.number" placeholder="number"/>
      <input type="text" class="form-control" v-model="address.postcode" placeholder="postcode"/>
       <input type="text" class="form-control" v-model="address.city" placeholder="city"/>
  </div>
<div class ="form">
    <label> COMPANY COMTACT </label>
    <input type="text" class="form-control" v-model="contact.email" placeholder="email"/>
        <input type="text" class="form-control" v-model="contact.phone" placeholder="phone"/>
  </div>
  <div class ="form">
    <label> COMPANY CATEGORY </label>
    <input type="text" class="form-control" v-model="category" placeholder="category"/>
  </div>
  <div class ="form">
    <label> COMPANY DEAL </label>
    <input type="text" class="form-control" v-model="deals" placeholder="deals"/>
  </div>
  <div class ="form">
    <label> COMPANY REVIEWS </label>
    <input type="text" class="form-control" v-model="reviews" placeholder="reviews"/>
  </div>
 <button class="btn btn-primary btn-block">ADD</button>
</form>
</div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'company',
  data() {
    return {
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
  },
  methods: {
    createCompany() {
      const newCompany = {
        name: this.name,
        street: this.address.street,
        number: this.address.number,
        postcode: this.address.postcode,
        city: this.address.city,
        email: this.contact.email,
        phone: this.contact.phone,
        category: this.category,
        deals: this.deals,
        reviews: this.reviews
      }
      Api.post('/companies', newCompany)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>
<style>
 .btn-primary {
  margin-bottom: 1em;
  text-align: center;
}
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

</style>
