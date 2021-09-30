<template>
  <div>
   <h1> Profile Page </h1>
       <h2> FirstName: {{firstName}}</h2>
       <h2> lastName: {{lastName}}</h2>
         <h2> Age: {{age}}</h2>
          <h2> Location: {{location}}</h2>
           <h2> Email: {{email}}</h2>
           <button @click="deleteUser()">Delete</button>
           <button @click="updateUser()">Update</button>
           <button @click="logout()">Logout</button>
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
          console.log('Deleted')
          // this.$router.push('/logIn')
          // console.log(true)
        })
    }

  }
}
</script>

<style>

</style>
