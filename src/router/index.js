import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Settings from '../views/Settings.vue';
import ItemEdit from '../views/ItemEdit.vue';
import ItemView from '../views/ItemView.vue';
import ItemNew from '../views/ItemNew.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/view/:_id',
    name: 'view',
    component: ItemView,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/edit/:_id',
    name: 'edit',
    component: ItemEdit,
  },
  {
    path: '/new',
    name: 'new',
    component: ItemNew,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
