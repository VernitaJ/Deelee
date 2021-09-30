<template>
<form @submit.prevent="handleSubmit">
  <h1>Sign Up</h1>

  <div class ="form-group">
    <label> First Name </label>
    <input type="text" class="form-control" v-model="firstName" placeholder="First Name"/>
  </div>

<div class ="form-group">
    <label> Last Name </label>
    <input type="text" class="form-control" v-model="lastName" placeholder="Last Name"/>
  </div>

<div class ="form-group">
    <label> Age </label>
    <input type="number" class="form-control" v-model="age" placeholder="Age"/>
  </div>

<div class ="form-group">
    <label> Location </label>
    <input type="text" class="form-control" v-model="location" placeholder="Location"/>
  </div>

<div class ="form-group">
    <label> Email </label>
    <input type="text" class="form-control" v-model="email" placeholder="Email"/>
  </div>

<div class ="form-group">
    <label> Password </label>
    <input type="password" class="form-control" v-model="password" placeholder="Password"/>
  </div>

 <button class="btn btn-primary btn-block">Sign Up</button>
</form>

</template>

<script>
import axios from 'axios'
export default {
  name: 'signUp',
  data() {
    return {
      firstName: '',
      lastName: '',
      age: '',
      location: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    handleSubmit() {
      const newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        location: this.location,
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:3000/api/users', newUser)
        .then(res => {
          this.error = ''
          this.$router.push('/login')
        }, err => {
          console.log(err.response)
          this.error = err.response.data.error
        })
    }
  }
}
</script>
