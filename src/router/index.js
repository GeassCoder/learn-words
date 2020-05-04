import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // TODO: can be removed??
    // name: 'Home',
    component: function () {
      // route level code-splitting
      // generates a separate chunk (home.[hash].js) which can be lazy-loaded.
      return import(/* webpackChunkName: "home" */ '../views/home.vue')
    }
  },
  {
    // TODO: need :word??
    path: '/list/:word',
    // TODO: can be removed??
    // name: 'List',
    props: true,
    component: function () {
      return import(/* webpackChunkName: "list" */ '../views/list.vue')
    }
  },
  {
    path: '/test',
    // TODO: can be removed??
    // name: 'Test',
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
