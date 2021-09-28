import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './views/User.vue'
import Review from './views/Review.vue'

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
      path: '/deals',
      name: 'deals',
      component: () => import('./components/Deals')
    },
    {
      path: '/review',
      name: 'review',
      component: Review
    }
  ]
})
