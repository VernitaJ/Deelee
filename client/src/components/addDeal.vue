<template>
<div class="overlay">
  <h1 class="heading">Add a deal</h1>
<form class="form-container">
  <div class ="form">
    <label class="label"> Title </label>
    <input type="text" class="input" v-model="name" placeholder="name"/>
  </div>

<div class ="form">
    <label class="label"> Tags </label>
    <input type="text" class="input" v-model="tag" placeholder="tag"/>
  </div>
  <div class="form">
  <label class="label" for="example-datepicker">Choose a date</label>
    <b-form-datepicker id="example-datepicker" class="input" v-model="date"></b-form-datepicker>
  </div>
<div class ="form">
    <label class="label"> Company </label>
    <div class="input">
    <autocomplete  :source="companies" placeholder="company">
    </autocomplete>
    </div>
    <button class="addnewbutton" type="button" @click="showAdd">New Company</button>
    <div v-if="newCompany">
      <companies/>
    </div>
  </div>
 <b-button pill variant="info" class="submit-button">Add this deal</b-button>
</form>
</div>
</template>

<script>
import { Api } from '@/Api'
import Autocomplete from 'vuejs-auto-complete'
import Companies from './Companies.vue'

export default {
  name: 'addDeal',
  components: {
    Autocomplete,
    Companies
  },
  props: {
    adding: Boolean
  },
  data() {
    return {
      name: '',
      tag: '',
      support: '0',
      company: '615b09f54a3eaa3a08c869da',
      companies: {},
      newCompany: false,
      date: ''
    }
  },
  mounted() {
    this.getCompanies()
  },
  methods: {
    handleToggle() {
      this.$emit('toggle', false)
    },
    getCompanies() {
      Api.get('/companies')
        .then(response => {
          this.companies = response.data.companies
        })
        .catch(error => {
          this.message = error
        })
    },
    showAdd() {
      this.newCompany = !this.newCompany
    },
    createDeal() {
      const newDeal = {
        name: this.name,
        tag: this.tag,
        support: this.support,
        company: this.company,
        position: this.position
      }
      Api.post('/deals', newDeal)
        .then(response => {
          console.log(response)
          this.$emit('toggle', false)
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
 .form {
   max-width: 80%;
   margin-left: 10px;
   padding: 10px;
 }
 .heading {
   color: rgb(184, 224, 220);
   padding-top: 100px;
 }
 .label {
   color:white;
   display: inline-block;
   margin: 25px 15px 5px;
   font-size: 0.9em;
   text-transform: uppercase;
   box-sizing: border-box;
   border-bottom: 1px solid black;
 }
 .input {
   display: block;
   padding: 15px 10px;
   height: 40px;
   box-sizing: border-box;
   border: none;
   border-bottom: 1px solid black;
   text-align: left;
   border-radius: 50px;
 }
 .deal-container {
   width: 80%;
   margin: 30px auto;
   background: rgb(33, 189, 189, 0.5);
   text-align: left;
   padding: 40px;
   border-radius: 10px;
 }
 .form-container {
   background: rgb(54, 49, 49, 0.5);
   padding: 5px;
 }
 .overlay {
  position: fixed;
  overflow: scroll;
  width: 50%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6);
  cursor: pointer; /* Add a pointer on hover */
}
.addnewbutton {
  margin-top: 1em;
  margin-right: 0;
  padding:5px;
  background-color: turquoise;
  color: black;
  float: right;
  border-radius: 50px;
}
.submit-button {
  margin-left: 20px;
  margin-top: 3em;
  font-size: 2em;
  height: 50px;
  color: yellow;
}
</style>
