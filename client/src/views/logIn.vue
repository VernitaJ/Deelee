<template>
<div>
<div class="Logo">
<b-img src="/images/Deelee.png"></b-img>
</div>
<div class="main">
  <div class="button">
  <button v-on:click="component = 'sign-in'">LogIn</button>
  </div>
  <div class="button1">
<button v-on:click="component = 'sign-up'">SignUp</button>
  </div>
<component v-bind:is="component"></component>

</div>
</div>
</template>
<script>
import signIn from '../components/signIn.vue'
import signUp from '../components/signUp.vue'
export default {
  components: {
    'sign-in': signIn,
    'sign-up': signUp
  },
  data() {
    return {
      component: 'sign-in'
    }
  },
  methods: {
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
background-color: #248C86;
padding: 5px 32px;
text-align: center;
margin: 5px 80px;
border: none;
float:left;
}
.button1 button {
color: white;
background-color: #35A6BE;
padding: 5px 32px;
text-align: center;
margin: 5px 80px;
border: none;
float:right
}
.Logo img {
 display: block;
  margin-left: auto;
  margin-right: auto;
  width: 15%;
  height: 2%;

}

</style>
