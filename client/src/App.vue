<template>
  <div id="app">
    <div id="nav" v-if="isLoggedIn">
      <nav class="navigation">
        <div class="home-link">
          <router-link class="item" to="/"
            ><img class="icon" src="../public/images/Icon.png"
          /></router-link>
        </div>
        <div class="profile-link">
          <router-link class="item-profile" to="/profile">Profile</router-link>
          <button class="item" @click="logout">Log out</button>
        </div>
      </nav>
      <router-view :user="user" />
    </div>
    <div v-else>
      <log-in @handleLogin="handleLogin()" />
    </div>
    <!-- Render the content of the current page view -->
  </div>
</template>
<script>
import logIn from './components/logIn.vue'
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
.navigation {
  background-color: rgb(1, 1, 1, 0.82);
  display: flex;
  position: relative;
  flex-direction: row;
  top: 0;
  overflow: auto;
}
.home-link {
  align-self: flex-start;
}
.profile-link {
  align-self: center;
  margin-left: auto;
  margin-right: 200px;
}
#nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  padding: 0 15px 0;
  border-radius: 4px;
}
.icon {
  width: 100px;
  padding-top: 0;
  margin: 0 0 0 40px;
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
#nav a.item-profile{
  background:#258a74;
  padding: 10px;
}
html body {
  background-color: #f7fff1;
}
</style>
