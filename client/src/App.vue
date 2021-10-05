<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/">Home</router-link>
      <router-link to="/users">Users</router-link>
      <router-link to="/signUp">SignUp</router-link>
      <router-link to="/logIn">LogIn</router-link>
      <router-link to="/profilePage">Profile</router-link>
      </nav>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(68, 61, 61);
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
</style>
