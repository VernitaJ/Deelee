<template>
<div>
  <h1>New company</h1>

<form @submit.prevent="createCompany">
{{position}}
  <div class ="form">
    <label> Name </label>
    <input type="text" class="form-control" v-model="name" placeholder="name"/>
  </div>

<div class ="form">
    <label> Contact </label>
    <input type="text" class="form-control" v-model="contact.email" placeholder="email"/>
        <input type="text" class="form-control" v-model="contact.phone" placeholder="phone"/>
  </div>
  <div class ="form">
    <label> Category </label>
    <input type="text" class="form-control" v-model="category" placeholder="category"/>
  </div>
  <button class="btn btn-primary btn-block">ADD</button>
</form>
</div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'company',
  props: {
    position: Object,
    show: Boolean
  },
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
      company_id: ''
    }
  },
  methods: {
    createCompany() {
      const newCompany = {
        name: this.name,
        email: this.contact.email,
        phone: this.contact.phone,
        category: this.category,
        position: this.position
      }
      Api.post('/companies', newCompany)
        .then(response => {
          this.company_id = response.data._id
          this.$emit('setChanges', this.company_id)
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
   color: white;
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
