<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <h2 class="signup">Sign Up</h2>
      </div>

      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="firstName"
          placeholder="First Name"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="lastName"
          placeholder="Last Name"
        />
      </div>
      <div class="form-group">
        <input
          type="number"
          class="form-control"
          v-model="age"
          placeholder="Age"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="location"
          placeholder="Location"
        />
      </div>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          v-model="email"
          placeholder="Email"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Password"
        />
      </div>

      <button class="btn btn-primary btn-block">Submit</button>
    </form>
  </div>
</template>

<script>
import { Api } from '@/Api'
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
      Api.post('/users', newUser).then(
        (res) => {
          console.log(res)
          this.$bvModal.msgBoxOk('SignUp Successful', this.$router.go(0))
        },
        (err) => {
          console.log(err.response)
          this.boxOne = ''
          this.error = err.response.data.error
          this.$bvModal.msgBoxOk(this.error)
        }
      )
    }
  }
}
</script>
<style scoped>
.signup {
  color: white;
  margin: 10px;
}
</style>
