<template>
  <form @submit.prevent="handleSubmit">
    <h1>Log In</h1>
    <div>
      <label>Email</label>
      <input
        type="email"
        class="form-control"
        v-model="email"
        placeholder="Email"
      />
    </div>
    <div>
      <label>Password</label>
      <input
        type="password"
        class="form-control"
        v-model="password"
        placeholder="Password"
      />
    </div>
    <button class="btn btn-primary btn-block">logIn</button>
  </form>
</template>
<script>
import { Api } from '@/Api'
export default {
  name: 'logIn',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    handleSubmit() {
      const user = {
        email: this.email,
        password: this.password
      }
      Api.post('/users/login', user).then(
        (res) => {
          // if successfull
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            this.$emit('handleLogin', true)
          }
        },
        (err) => {
          console.log(err.response)
          this.error = err.response.data.error
          this.boxOne = ''
          this.$bvModal.msgBoxOk('Invalid Credentials')
        }
      )
    }
  }
}
</script>
<style>
h1 {
  color: white;
}
.label {
  color: white;
}
</style>
