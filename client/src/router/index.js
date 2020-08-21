import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/products/add',
    name: 'AddProduct',
    component: () => import(/* webpackChunkName: "addproduct" */ '../views/AddProductForm')
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "productdetail" */ '../views/EditProductForm')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
