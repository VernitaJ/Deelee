<template>
  <div class="profileform">
    <div class="Logo">
<b-img src="/images/Deelee.png"></b-img>
</div>
    <div class="form-data">

   <h1 class="h1"> Profile Page </h1>
   <button class="button-update" onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Update</button>

   <div class="Text">
       <h2> FirstName: {{firstName}}</h2>
       <h2> LastName: {{lastName}}</h2>
         <h2> Age: {{age}}</h2>
          <h2> Location: {{location}}</h2>
           <h2> Email: {{email}}</h2>
   </div>
           <div class="button-delet">
           <button @click="deleteUser()">Delete</button>
           </div>
           <div class="button-logout">
           <button @click="logout()">Logout</button>
           </div>
    </div>

<div id="id01" class="modal">

  <form class="modal-contents" @submit="updatingUser">
    <div class="form">
   <div class ="form-group-user">
      <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>

   <div class ="form-group-user">
    <label class="label-user">First Name:-</label>
    <input type="text" class="form-control" v-model.lazy="firstName" placeholder="First Name"/>
  </div>
  <div class ="form-group-user">
    <label class="label-user">Last Name:-</label>
    <input type="text" class="form-control" v-model.lazy="lastName" placeholder="Last Name"/>
  </div>

<div class ="form-group-user">
    <label class="label-user">Age:-</label>
    <input type="number" class="form-control" v-model.lazy="age" placeholder="Age"/>
  </div>

<div class ="form-group-user">
    <label class="label-user">Location:-</label>
    <input type="text" class="form-control" v-model.lazy="location" placeholder="Location"/>
  </div>
   <button class="button-update2">Update</button>
   </div>
   </div>
  </form>
</div>

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
    Api.get('/user', { headers: { token: localStorage.getItem('token') } })
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
      Api.delete(`/users/${this.id}`)
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
      Api.put(`/users/${this.id}`, updateUser)
        .then(res => {
          console.log(res)
          this.$router.push('/profilePage')
        }, err => {
          console.log(err.response)
        })
    }

  }
}

</script>

<style>
.button-update  {
  background-color: #1273E5;
color: black;
padding: 0px 25px;
border: none;
text-align: center;
cursor: pointer;
margin-top: -50px;
float:right;
}
.button-delet button {
 background-color: #1273E5;
color: black;
padding: 1px 30px;
border: none;
text-align: center;
cursor: pointer;
margin: 30px 120px;
float:right;
}
.button-logout button {
background-color: #1273E5;
color: black;
padding: 1px 30px;
border: none;
text-align: center;
cursor: pointer;
margin: 30px 120px;
float:left;
}
.button-update2 {
background-color: #1273E5;
color: black;
padding: 5px 1px;
width:300px;
border: none;
text-align: center;
cursor: pointer;
margin: 30px 10px;
}
.form-data {
  background-color: #D3E7F9;
  color: black;
  max-width: 800px;
  height: 450px;
   margin: 30px auto;
   padding: 40px;
   border-radius: 10px;
   margin-top: 10px;

}
.Logo img {
 display: block;
  margin-left: auto;
  margin-right: auto;
  width: 15%;
  height: 2%;
}
.Text {
  margin-right: 370px;
  margin-left: auto;
}
.modal-contents {
  background: none;
  border: none;
  max-width: 500px;
  max-height: 650px;
  margin-left: 900px;
   border-radius: none;
   margin-top: 200px;
   position:fixed;

}
.close {
  background-color: #D3E7F9;
}
.label-user {
 color: white;
  padding: 1px 1px;
}

.form {
  max-width: 100%;
  max-height: 100%;
   margin: 30px auto;
   text-align: left;
   padding: 40px;
   border-radius: 100px;
   background-color: #343633;
   opacity: 95%;
}
.h1 {
  color: black;
  font-style: bold;
}
</style>
