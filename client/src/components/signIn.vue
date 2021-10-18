<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="login">Log In</h2>
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
            this.$router.push('/')
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
.login {
  color: white;
  margin: 10px;
}
.label {
  color: white;
}
</style>
