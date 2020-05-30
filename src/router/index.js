import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: function () {
      // route level code-splitting
      // generates a separate chunk (home-view.[hash].js) which can be lazy-loaded.
      return import(/* webpackChunkName: "home-view" */ '../views/home-view.vue')
    }
  },
  {
    path: '/list',
    props: true,
    component: function () {
      return import(/* webpackChunkName: "list-view" */ '../views/list-view.vue')
    }
  },
  {
    path: '/test',
    props: true,
    component: function () {
      return import(/* webpackChunkName: "test-view" */ '../views/test-view.vue')
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
