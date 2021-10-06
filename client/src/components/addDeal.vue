<template>
<div class="overlay">
  <h1 class="heading">Add a deal</h1>
<form class="form-container" >
  <div class ="form">
    <label class="label"> Title </label>
    <input type="text" class="input" v-model="name" placeholder="name"/>
  </div>

<div class ="form">
    <label class ="label"> TAG</label>
      <b-form-tags input-id="tags-basic" v-model="tag"></b-form-tags>
  </div>
  <div class="form">
  <label class="label" for="example-datepicker">Choose a date</label>
    <b-form-datepicker id="example-datepicker" class="input" v-model="date"></b-form-datepicker>
  </div>
<div class ="form">
    <label class="label"> Company </label>
    <div class="input">
    {{selectedCompany}}
    </div>
    <b-form-select  v-model="selectedCompany" >
      <option>Manual Option</option>
      <option v-for="company in companies"  :value="company._id" :key="company._id">{{ company.name }}</option>
     </b-form-select>
    <button class="addnewbutton" type="button" @click="addCompany">{{ text }}</button>
    <div v-if="show">
      <companies @setChanges="setChanges" v-bind:position="position"/>
    </div>
  </div>
 <b-button v-if="!show" pill variant="info" type="submit" @click="createDeal" class="submit-button">Add this deal</b-button>
</form>
</div>
</template>

<script>
import { Api } from '@/Api'
import Companies from './Companies.vue'

export default {
  name: 'addDeal',
  components: {
    Companies
  },
  props: {
    adding: Boolean,
    position: Object
  },
  data() {
    return {
      text: 'New Company',
      name: '',
      tag: '',
      support: '0',
      companies: [],
      show: false,
      date: '',
      selectedCompany: {}
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
    setCompany(selected) {
      this.selectedCompany = selected
      console.log(this.selectedCompany)
    },
    addCompany() {
      this.text === 'New Company' ? this.text = 'Cancel' : this.text = 'New Company'
      this.show = !this.show
    },
    setChanges(value) {
      this.company = value
      console.log(this.company)
      this.addCompany()
      this.getCompanies()
    },
    createDeal() {
      const newDeal = {
        name: this.name,
        tag: this.tag,
        support: this.support,
        company: this.selectedCompany,
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
   color: rgb(255, 255, 255);
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
   background: rgba(10, 10, 10, 0.5);
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
  background-color: rgb(22, 49, 47);
  color: rgb(255, 255, 255);
  float: right;
  border:none;
  border-radius: 5px;
}
.submit-button {
  margin-left: 20px;
  margin-top: 3em;
  font-size: 2em;
  height: 50px;
}
</style>
