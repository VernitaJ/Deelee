<template>
  <div class="profileform">
    <div class="Logo">
      <b-img src="/images/Deelee.png"></b-img>
    </div>
    <div class="form-data">
      <h3>Profile</h3>
      <button
        class="button-update"
        onclick="document.getElementById('id01').style.display='block'"
        style="width: auto"
      >
        Update
      </button>
      <div class="text-container">
        <div class="text">
          <div style="display: flex">
            <p class="attribute">First Name:</p>
            <p>{{ user.firstName }}</p>
          </div>
          <div style="display: flex">
            <p class="attribute">Last Name:</p>
            <p>{{ user.lastName }}</p>
          </div>
          <div style="display: flex">
            <p class="attribute">Age:</p>
            <p>{{ user.age }}</p>
          </div>
          <div style="display: flex">
            <p class="attribute">Location:</p>
            <p>{{ user.location }}</p>
          </div>
          <div style="display: flex">
            <p class="attribute">Email:</p>
            <p>{{ user.email }}</p>
          </div>
        </div>
      </div>
      <div class="button-delete">
        <button @click="deleteUser()">Delete</button>
      </div>
    </div>

    <div id="id01" class="modal">
      <form class="modal-contents" @submit="updatingUser">
        <div class="container">
          <div class="form-update">
            <span
              onclick="document.getElementById('id01').style.display='none'"
              class="close"
              title="Close Modal"
              >&times;</span
            >
            <input
              type="text"
              class="form-control"
              v-model.lazy="firstName"
              placeholder="First Name"
            />
            <input
              type="text"
              class="form-control"
              v-model.lazy="lastName"
              placeholder="Last Name"
            />
            <input
              type="number"
              class="form-control"
              v-model.lazy="age"
              placeholder="Age"
            />
            <input
              type="text"
              class="form-control"
              v-model.lazy="location"
              placeholder="Location"
            />
            <button class="btn btn-primary btn-block">Update</button>
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
  props: {
    user: Object
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      age: '',
      location: ''
    }
  },
  created() {
    // user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
  },
  mounted() {
    if (localStorage.getItem('user')) {
      console.log(this.user)
    }
  },
  methods: {
    deleteUser() {
      Api.delete(`/users/${this.user.id}`)
        .then((res) => {
          console.log(res)
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updatingUser() {
      const updateUser = {
        firstName: this.firstName || this.user.firstName,
        lastName: this.lastName || this.user.lastName,
        age: this.age || this.user.age,
        location: this.location || this.user.location
      }
      Api.patch(`/users/${this.user.id}`, updateUser).then(
        (res) => {
          console.log(res)
          this.$router.push('/profile')
        },
        (err) => {
          console.log(err.response)
        }
      )
    }
  }
}
</script>

<style>
.button-update {
  background-color: #226ec5;
  color: rgb(255, 255, 255);
  padding: 0px 25px;
  border: none;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  margin-top: -50px;
  float: right;
}
.attribute {
  font-size: 1.3rem;
  margin-right: 1rem;
  margin-top: 0.2rem;
  color: rgb(224, 219, 219);
}
.button-delete button {
  background-color: #c7526c;
  color: rgb(255, 255, 255);
  padding: 1px 30px;
  border: none;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  margin: 30px 120px;
  float: right;
}
.button-delete:hover {
  color: black;
}
.form-data {
  background-color: #1a6656;
  color: rgb(255, 255, 255);
  border: 5px solid rgb(77, 124, 111);
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
.text-container {
  text-align: left;
}
.text {
  margin-left: 40px;
  font-weight: 200;
  font-size: 1.5rem;
}
.modal-contents {
  background: none;
  border: none;
}
.close {
  background-color: #d3e7f9;
}
.label-user {
  color: white;
  padding: 1px 1px;
}

.form-update {
  max-width: 60%;
  max-height: 1000px;
  margin: 30px auto;
  text-align: left;
  padding: 20px;
  border-radius: 10px;
  background-color: #343633;
  opacity: 95%;
}
.h1 {
  color: black;
  font-style: bold;
}

.container {
  background: none;
  margin-top: 20%;
  margin-bottom: auto;
}
.form-update input {
  padding: 10px;
  margin-top: 10px;
}
.form-update button {
  margin-top: 10px;
}
</style>
