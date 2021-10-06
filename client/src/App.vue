<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
     <li class="nav-item" v-if="isLoggedIn==null">
      <router-link to="/logIn">LogIn</router-link>
     </li>
     <li class="nav-item" v-else>
       <router-link to="/">Home</router-link>
      <router-link to="/profilePage">Profile</router-link>
     </li>
      </nav>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn() {
      return window.localStorage.getItem('token')
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
  color: #2c3e50;
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
html
body {
  background-color:#F7FFF1 ;
}
</style>
