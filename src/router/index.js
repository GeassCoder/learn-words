import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: function () {
      // route level code-splitting
      // generates a separate chunk (home.[hash].js) which can be lazy-loaded.
      return import(/* webpackChunkName: "home" */ '../views/home.vue')
    }
  },
  {
    // TODO: add query params for filter, sort & selected languages state?
    path: '/list',
    props: true,
    component: function () {
      return import(/* webpackChunkName: "list" */ '../views/list.vue')
    }
  },
  {
    path: '/test',
    props: true,
    component: function () {
      return import(/* webpackChunkName: "list" */ '../views/test.vue')
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
