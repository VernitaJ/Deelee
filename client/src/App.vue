<template>
  <div id="app">
    <div id="nav" v-if="isLoggedIn">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <li class="nav-item">
          <router-link to="/">Home</router-link>
          <router-link to="/profilePage">Profile</router-link>
        </li>
        <a href="/login" @click="handleLogin(false)">Logout</a>
      </nav>
      <router-view />
    </div>
    <div v-else>
      {{ isLoggedIn }}
      <log-in @handleLogin="handleLogin" />
    </div>
    <!-- Render the content of the current page view -->
  </div>
</template>
<script>
import logIn from './views/logIn.vue'
export default {
  components: { logIn },
  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    handleLogin(value) {
      this.isLoggedIn = value
      // this.$router.push('/')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #106877;
}
#nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}

#nav a.router-link-exact-active {
  color: white;
  background: crimson;
}
html body {
  background-color: #f7fff1;
}
</style>
