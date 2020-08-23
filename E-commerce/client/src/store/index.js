import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Products: [],
    localStorage: '',
    updatedProduct: []
  },
  mutations: {
    SET_LOCALSTORAGE (state, payload) {
      state.localStorage = payload
    },
    SET_PRODUCTS (state, payload) {
      state.Products = payload
    },
    BACK_TO_MAIN (state, payload) {
      router.push('/main')
    },
    BACK_TO_MAIN_1 (state, payload) {
      router.go(router.currentRoute)
    },
    showUpdateProduct (state, id) {
      router.push('/updateProduct')
      const index = state.Products.findIndex(x => x.id === id)
      state.updatedProduct = state.Products[index]
    },
    SET_UPDATED_PRODUCT (state, id) {
      const index = state.Products.findIndex(x => x.id === id)
      state.updatedProduct = state.Products[index]
    },
    LOGOUT_USER (state) {
      localStorage.removeItem('token')
      router.push('/')
    }
  },
  actions: {
    Login (context, token) {
      axios({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: {
          email: token.email,
          password: token.password
        }
      })
        .then(data => {
          context.commit('SET_LOCALSTORAGE', data.data.token)
          localStorage.setItem('token', data.data.token)
          router.push('/main')
        })
        .catch(err => {
          console.log(err)
        })
    },
    readProducts (context, info) {
      axios({
        url: 'http://localhost:3000/products',
        method: 'GET',
        headers: { access_token: localStorage.getItem('token') }
      })
        .then(data => {
          context.commit('SET_PRODUCTS', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct (context, info) {
      axios({
        url: 'http://localhost:3000/products',
        method: 'POST',
        headers: { access_token: localStorage.getItem('token') },
        data: {
          name: info.name,
          price: info.price,
          stock: info.stock,
          image_url: info.image_url
        }
      })
        .then(data => {
          console.log('addProduct>>>', data.data)
          context.commit('BACK_TO_MAIN')
        })
        .catch(err => {
          console.log(err)
        })
    },
    showAddProduct (context, info) {
      router.push('/coba')
    },
    deleteProduct (context, id) {
      axios({
        url: `http://localhost:3000/products/${id}`,
        method: 'DELETE',
        headers: { access_token: localStorage.getItem('token') }
      })
        .then(data => {
          context.commit('BACK_TO_MAIN_1')
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateProduct (context, obj) {
      axios({
        url: `http://localhost:3000/products/${obj.id}`,
        method: 'PUT',
        headers: { access_token: localStorage.getItem('token') },
        data: {
          name: obj.name,
          price: obj.price,
          stock: obj.stock,
          image_url: obj.image_url
        }
      })
        .then(data => {
          console.log('updatedProduct>>>', data)
          context.commit('BACK_TO_MAIN')
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout (context, info) {
      context.commit('LOGOUT_USER')
    }
  },
  modules: {
  }
})
