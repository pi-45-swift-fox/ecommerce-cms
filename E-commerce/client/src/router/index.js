import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import AddProductForm from '../views/Add Product.vue'
import updateProduct from '../views/updateProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/coba',
    name: 'AddProduct',
    component: AddProductForm
  },
  {
    path: '/updateProduct',
    name: 'UpdateProduct',
    component: updateProduct
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Home' && !localStorage.getItem('token')) {
    next({ name: 'Home' })
  } else {
    next()
  }
})
export default router
