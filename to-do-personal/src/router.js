import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Settings from './views/Settings.vue'
import Account from './views/Account.vue'
import Item from './views/Item.vue'

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
      path: '/',
      name: 'item',
      component: Item
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    }
  ]
})
