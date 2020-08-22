import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NewProduct from '../views/NewProduct'
import EditProduct from '../views/EditProduct'
import Fashion from '../views/Fashion'
import Books from '../views/Books'
import Electronics from '../views/Electronics'
import Otomotif from '../views/Otomotif'
import Foods from '../views/Foods'
import Drinks from '../views/Drinks'
import Furniture from '../views/Furniture'
import Others from '../views/Others'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/newproduct',
    name: 'NewProduct',
    component: NewProduct
  },
  {
    path: '/editproduct/:id',
    name: 'EditProduct',
    component: EditProduct
  },
  {
    path: '/fashion',
    name: 'Fashion',
    component: Fashion
  },
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/electronics',
    name: 'Electronics',
    component: Electronics
  },
  {
    path: '/otomotif',
    name: 'Otomotif',
    component: Otomotif
  },
  {
    path: '/foods',
    name: 'Foods',
    component: Foods
  },
  {
    path: '/drinks',
    name: 'Drinks',
    component: Drinks
  },
  {
    path: '/furniture',
    name: 'Furniture',
    component: Furniture
  },
  {
    path: '/others',
    name: 'Others',
    component: Others
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
