import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import ProductTable from '../views/ProductTable.vue';
import BannerTable from '../views/BannerTable.vue';
import FormProduct from '../views/FormProduct.vue';
import FormBanner from '../views/FormBanner.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: '/dashboard/products',
        name: 'ProductTable',
        component: ProductTable,
      },
      {
        path: '/dashboard/banners',
        name: 'BannerTable',
        component: BannerTable,
      },
      {
        path: '/dashboard/products/form',
        name: 'FormProduct',
        component: FormProduct,
      },
      {
        path: '/dashboard/banners/form',
        name: 'FormBanner',
        component: FormBanner,
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.access_token) next({ name: 'Login' });
  else next();
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && localStorage.access_token) next({ name: 'ProductTable' });
  else next();
});

export default router;
