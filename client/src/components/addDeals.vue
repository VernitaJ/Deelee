<template>
<div>
  <h1>ADD DEALS</h1>

<form @submit.prevent="createDeal">

  <div class ="form">
    <label> DEAL NAME </label>
    <input type="text" class="form-control" v-model="name" placeholder="name"/>
  </div>

<div class ="form">
    <label> DEAL TAGS </label>
    <input type="text" class="form-control" v-model="tag" placeholder="tag"/>
  </div>
<div class ="form">
    <label> DEAL COMPANY </label>
    <input type="text" class="form-control" v-model="company" placeholder="company"/>
  </div>
 <button class="btn btn-primary btn-block">ADD</button>
</form>
</div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'addDeal',
  data() {
    return {
      name: '',
      tag: '',
      support: '0',
      company: ''
    }
  },
  methods: {
    createDeal() {
      const newDeal = {
        name: this.name,
        tag: this.tag,
        support: this.support,
        company: this.company
      }
      Api.post('/deals', newDeal)
        .then(response => {
          console.log(response)
          this.$router.push('/deal')
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
