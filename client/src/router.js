import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './views/User.vue'
import signUp from './views/signUp.vue'
import logIn from './views/logIn.vue'
import Deal from './views/Deal.vue'
import ListOfDeals from './views/ListOfDeals.vue'
import NewDeal from './views/NewDeal.vue'
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
      component: ListOfDeals
    },
    {
      path: '/deals/:id',
      name: 'deals',
      component: Deal
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
      path: '/newdeal',
      name: 'newDeal',
      component: NewDeal,
      props: true
    }
  ]
})
