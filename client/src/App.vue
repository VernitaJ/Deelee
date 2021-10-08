<template>
  <div id="app">
    <div id="nav" v-if="isLoggedIn">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <img class="icon" src="../public/images/Icon.png" />
        <router-link to="/">Home</router-link>
        <router-link to="/profilePage">Profile</router-link>
        <button class="logout" @click="logout">Log out</button>
      </nav>
      <router-view />
    </div>
    <div v-else>
      <log-in @handleLogin="handleLogin()" />
    </div>
    <!-- Render the content of the current page view -->
  </div>
</template>
<script>
import logIn from './components/logIn.vue'
export default {
  components: { logIn },
  data() {
    return {
      isLoggedIn: false
    }
  },
  mounted() {
    if (localStorage.getItem('token') === null) {
      this.isLoggedIn = false
      this.$router.push('/login')
    } else this.isLoggedIn = true
  },
  methods: {
    logout() {
      localStorage.setItem('token', null)
      this.isLoggedIn = false
      localStorage.clear()
    },
    handleLogin() {
      this.isLoggedIn = true
      this.$router.push('/login')
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
  padding: 0 15px 0;
  border-radius: 4px;
}

.icon {
  width: 70px;
  padding: 0;
}

#nav a.router-link-exact-active {
  color: white;
  background: rgb(148, 65, 82);
}

html body {
  background-color: #f7fff1;
}
</style>
