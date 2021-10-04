<template>
<div class="overlay">
  <h1 class="heading">Add a deal</h1>
<form class="form-container" @submit.prevent="createDeal">
  <div class ="form">
    <label class="label"> TITLE </label>
    <input type="text" class="input" v-model="name" placeholder="name"/>
  </div>

<div class ="form">
    <label class="label"> TAGS </label>
    <input type="text" class="input" v-model="tag" placeholder="tag"/>
  </div>
<div class ="form">
    <label class="label"> COMPANY </label>
    <input type="text" class="input" v-model="company" placeholder="company"/>
  </div>
 <button class="btn btn-primary btn-block">Add this deal</button>
</form>
</div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'addDeal',
  props: {
    position: Object,
    adding: Boolean
  },
  data() {
    return {
      name: '',
      tag: '',
      support: '0',
      company: '615b09f54a3eaa3a08c869da'
    }
  },
  methods: {
    handleToggle() {
      this.$emit('toggle', false)
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
   color: rgb(168, 241, 234);
   padding-top: 100px;
 }
 .label {
   color:white;
   display: inline-block;
   margin: 25px 0 15px;
   font-size: 0.9em;
   text-transform: uppercase;
   box-sizing: border-box;
   border-bottom: 1px solid black;
 }
 .input {
   display: block;
   padding: 15px 10px;
   box-sizing: border-box;
   border: none;
   border-bottom: 1px solid black;
   text-align: left;
   border-radius: 10px;
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
  width: 50%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6);
  cursor: pointer; /* Add a pointer on hover */
}
</style>
