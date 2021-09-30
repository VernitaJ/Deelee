import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './views/User.vue'
import Review from './views/Review.vue'
import signUp from './views/signUp.vue'
import logIn from './views/logIn.vue'
import Deal from './views/Deal.vue'
import Deals from './views/Deals.vue'
import addDeals from './views/addDeals.vue'
import profilePage from './views/profilePage.vue'

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
      path: '/deal',
      name: 'deal',
      component: Deal
    },
    {
      path: '/deals/:id',
      name: 'deals',
      component: Deals
    },
    {
      path: '/review',
      name: 'review',
      component: Review
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/logIn',
      name: 'logIn',
      component: logIn
    },
    {
      path: '/profilePage',
      name: 'profilePage',
      component: profilePage,
      props: true
    },
    {
      path: '/deals/',
      name: 'addDeals',
      component: addDeals
    }
  ]
})
