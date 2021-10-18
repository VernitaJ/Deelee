<template>
  <div id="app">
    <div v-if="isLoggedIn">
      <b-navbar type="dark" variant="dark" class="navigation">
        <b-navbar-brand class="item" to="/"
          ><img class="icon" src="../public/images/Icon.png"
        /></b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="nav-item" href="/profile">Profile</b-nav-item>
          <b-nav-item class="nav-item" @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <router-view v-bind:user="user" />
    </div>
    <div v-else>
      <log-in @handleLogin="handleLogin()" />
    </div>
    <!-- Render the content of the current page view -->
  </div>
</template>
<script>
import logIn from './views/logIn.vue'
import { Api } from '@/Api'

export default {
  components: { logIn },
  data() {
    return {
      isLoggedIn: false,
      user: {}
    }
  },
  mounted() {
    if (localStorage.getItem('token') === null) {
      this.isLoggedIn = false
      this.$router.push('/login')
    } else {
      this.isLoggedIn = true
      this.getUser()
    }
  },
  methods: {
    logout() {
      localStorage.setItem('token', null)
      this.isLoggedIn = false
      this.user = {}
      localStorage.clear()
    },
    handleLogin() {
      this.isLoggedIn = true
      this.getUser()
    },
    getUser() {
      Api.get('/user', {
        headers: { token: localStorage.getItem('token') }
      }).then((res) => {
        this.user = res.data.user
        console.log(res.data.user)
      })
    },
    home() {
      this.$router.push('/')
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
#app a {
  color: white;
  text-decoration: none;
  font-size: 20px;
}
.navigation {
  padding: 0;
  height: 80px;
  font-size: 25px;
}
.home-link {
  align-self: flex-start;
}
.icon {
  width: 100px;
  padding-top: 0;
  margin: 0;
}
.ml-auto {
  margin-right: 100px;
}
.item {
  display: inline-block;
  text-align: center;
  padding: 10px;
  background-color: transparent;
  border: none;
  color: white;
  text-decoration: none;
  font-size: 17px;
  font-weight: bolder;
}
html body {
  background-color: #f7fff1;
}

@media only screen and (min-device-width: 360px) and (max-device-height: 768px) and (-webkit-device-pixel-ratio: 3) {
  .logo {
    width: 25%;
    height: auto;
  }
  .ml-auto {
    margin-right: 0;
  }
}
</style>
