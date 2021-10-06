import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './views/User.vue'
import Review from './views/Review.vue'
import logIn from './views/logIn.vue'
import Deal from './views/Deal.vue'
import profilePage from './views/profilePage.vue'
import Company from './views/Company.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/users',
      name: 'users',
      component: User
    },
    {
      path: '/deals/:id',
      name: 'deal',
      component: Deal
    },
    {
      path: '/companies/:id',
      name: 'company',
      component: Company
    },
    {
      path: '/logIn',
      name: 'logIn',
      component: logIn
    },
    {
      path: '/logIn',
      name: 'logIn',
      component: Home
    },
    {
      path: '/profilePage',
      name: 'profilePage',
      component: profilePage
    }
  ]
})
