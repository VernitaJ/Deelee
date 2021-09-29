<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/">Home</router-link>
      <router-link to="/users">Users</router-link>
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
}
</style>
