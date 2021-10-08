<template>
  <div>
    <div class="Logo">
      <b-img src="/images/Deelee.png"></b-img>
    </div>
    <div class="main">
      <div class="button">
        <button v-on:click="handleToggle(true)">LogIn</button>
      </div>
      <div class="button1">
        <button v-on:click="handleToggle(false)">SignUp</button>
      </div>
      <div v-if="signIn">
        <sign-in @handleLogin="handleLogin()" :v-bind="signIn" />
      </div>
      <div v-else>
        <sign-up />
      </div>
    </div>
  </div>
</template>
<script>
import signIn from '../components/signIn.vue'
import signUp from '../components/signUp.vue'

export default {
  components: { signIn, signUp },
  data() {
    return {
      signIn: true
    }
  },
  methods: {
    handleToggle(value) {
      this.signIn = value
    },
    handleLogin() {
      this.$emit('handleLogin', true)
    }
  }
}
</script>
<style>
.main {
  max-width: 800px;
  margin: 30px auto;
  background: #343633;
  padding: 40px;
  border-radius: 10px;
  margin-top: 10px;
}
.button button {
  color: white;
  background-color: #248c86;
  padding: 5px 32px;
  text-align: center;
  margin: 5px 80px;
  border: none;
  float: left;
}
.button1 button {
  color: white;
  background-color: #35a6be;
  padding: 5px 32px;
  text-align: center;
  margin: 5px 80px;
  border: none;
  float: right;
}
.Logo img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 15%;
  height: 2%;
}
</style>
