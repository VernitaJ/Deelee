<template>
  <div>
   <h1> Profile Page </h1>
       <h2> FirstName: {{firstName}}</h2>
       <h2> LastName: {{lastName}}</h2>
         <h2> Age: {{age}}</h2>
          <h2> Location: {{location}}</h2>
           <h2> Email: {{email}}</h2>
           <button @click="deleteUser()">Delete</button>
           <button @click="logout()">Logout</button>
<form @submit="updatingUser">
  <h1>Update User</h1>

  <div class ="form-group">
    <label>First Name </label>
    <input type="text" class="form-control" v-model="firstName" placeholder="First Name"/>
  </div>
  <div class ="form-group">
    <label>Update Last Name </label>
    <input type="text" class="form-control" v-model="lastName" placeholder="Last Name"/>
  </div>

<div class ="form-group">
    <label>Update Age </label>
    <input type="number" class="form-control" v-model="age" placeholder="Age"/>
  </div>

<div class ="form-group">
    <label>Update Location </label>
    <input type="text" class="form-control" v-model="location" placeholder="Location"/>
  </div>
 <button class="btn btn-primary btn-block">Update</button>
</form>
    </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'profilePage',
  data() {
    return {
      firstName: '',
      lastName: '',
      age: '',
      location: '',
      email: '',
      password: '',
      id: ''
    }
  },
  created() {
    // user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
  },
  mounted() {
    Api.get('http://localhost:3000/api/user', { headers: { token: localStorage.getItem('token') } })
      .then(res => {
        this.firstName = res.data.user.firstName
        this.lastName = res.data.user.lastName
        this.age = res.data.user.age
        this.location = res.data.user.location
        this.email = res.data.user.email
        this.password = res.data.user.password
        this.id = res.data.user.id
      })
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/logIn')
    },
    deleteUser() {
      Api.delete(`http://localhost:3000/api/users/${this.id}`)
        .then(res => {
          console.log(res)
          this.$router.push('/signUp')
        })
        .catch(error => {
          console.log(error)
        })
    },
    updatingUser() {
      const updateUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        location: this.location
      }
      Api.put(`http://localhost:3000/api/users/${this.id}`, updateUser)
        .then(res => {
          console.log(res)
          this.$router.push('/')
        }, err => {
          console.log(err.response)
        })
    }

  }
}
</script>

<style>

</style>
