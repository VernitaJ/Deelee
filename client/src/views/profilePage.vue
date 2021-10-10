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
        <div class="form">
          <div class="form-group-user">
            <span
              onclick="document.getElementById('id01').style.display='none'"
              class="close"
              title="Close Modal"
              >&times;</span
            >

            <div class="form-group-user">
              <label class="label-user">First Name:</label>
              <input
                type="text"
                class="form-control"
                v-model.lazy="firstName"
                placeholder="First Name"
              />
            </div>
            <div class="form-group-user">
              <label class="label-user">Last Name:</label>
              <input
                type="text"
                class="form-control"
                v-model.lazy="lastName"
                placeholder="Last Name"
              />
            </div>

            <div class="form-group-user">
              <label class="label-user">Age:</label>
              <input
                type="number"
                class="form-control"
                v-model.lazy="age"
                placeholder="Age"
              />
            </div>

            <div class="form-group-user">
              <label class="label-user">Location:</label>
              <input
                type="text"
                class="form-control"
                v-model.lazy="location"
                placeholder="Location"
              />
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
      console.log('true if statment')
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
.button-logout button {
  background-color: #1273e5;
  color: black;
  padding: 1px 30px;
  border: none;
  text-align: center;
  cursor: pointer;
  margin: 30px 120px;
  float: left;
}
.button-update2 {
  background-color: #1273e5;
  color: black;
  padding: 5px 1px;
  width: 300px;
  border-radius: 5px;
  border: none;
  text-align: center;
  cursor: pointer;
  margin: 30px 10px;
}
.form-data {
  background-color: #258a74;
  color: rgb(255, 255, 255);
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
  max-width: 500px;
  max-height: 650px;
  margin-left: 900px;
  margin-top: 50px;
  position: fixed;
}
.close {
  background-color: #d3e7f9;
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
  border-radius: 10px;
  background-color: #343633;
  opacity: 95%;
}
.h1 {
  color: black;
  font-style: bold;
}
</style>
