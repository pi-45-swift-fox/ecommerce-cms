import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axiosInstance.js'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    login (state, userData) {
      state.loggedUser = userData.email
      axios
        .post('/login', { email: userData.email, password: userData.password })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          router.push({ name: 'Home' })
        })
        .catch(console.log)
    },
    logout () {
      localStorage.removeItem('access_token')
      router.push({ name: 'LoginPage' })
    },
    fetchProducts (state) {
      axios
        .get('/products', { headers: { access_token: localStorage.getItem('access_token') } })
        .then(({ data }) => {
          state.products = data
        })
        .catch(console.log)
    },
    addProduct (state, productData) {
      axios
        .post('/products', { name: productData.name, image_url: productData.image_url, price: productData.price, stock: productData.stock }, { headers: { access_token: localStorage.getItem('access_token') } })
        .then(() => {
        })
        .catch(console.log)
    },
    deleteProduct (state, productId) {
      axios
        .delete(`/products/${productId}`, { headers: { access_token: localStorage.getItem('access_token') } })
        .then(() => {
        })
        .catch(console.log)
    },
    editProduct (state, productData) {
      axios
        .put(`/products/${productData.id}`, { name: productData.name, image_url: productData.image_url, price: productData.price, stock: productData.stock }, { headers: { access_token: localStorage.getItem('access_token') } })
        .then(() => {
        })
        .catch(console.log)
    }
  },
  actions: {
  },
  modules: {
  }
})
