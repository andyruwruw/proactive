import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Settings from './views/Settings.vue'
import ItemEdit from './views/ItemEdit.vue'
import ItemView from './views/ItemView.vue'
import ItemNew from './views/ItemNew.vue'

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
      path: '/item/:_id',
      name: 'item',
      component: ItemView
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/edit/:_id',
      name: 'edit',
      component: ItemEdit
    },
    {
      path: '/new',
      name: 'new',
      component: ItemNew
    }
  ]
})
