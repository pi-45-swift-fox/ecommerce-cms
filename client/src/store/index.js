import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: 10,
    products: [],
    eachProduct: {},
    userEmail: ''
  },
  mutations: {
    setProduct (state, products) {
      state.products = products
    },
    pushProduct (state, product) {
      state.products.push(product)
    },
    eachProduct (state, product) {
      state.eachProduct = product
    },
    userEmail (state, email) {
      state.userEmail = email
    }
  },
  actions: {
    login (state, user) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: user
      }).then(function ({ data }) {
        localStorage.access_token = data.access_token
        state.commit('userEmail', data.email)
        router.push({ name: 'Products' })
        console.log(data)
      })
        .catch(err => console.log(err))
    },
    fetchProduct (state) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/products',
        headers: {
          access_token: localStorage.access_token
        }
      }).then(response => {
        console.log(response)
        state.commit('setProduct', response.data)
      })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct (state, product) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/products',
        data: product,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log(response)
          state.commit('pushProduct', response.data)
        })
        .catch(err => {
          console.log(err)
        })
      console.log(product)
    },
    getOneProduct (state, id) {
      axios({
        method: 'get',
        url: `http://localhost:3000/products/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          state.commit('eachProduct', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  getters: {
    convertToPascal: (state) => (string) => {
      return string.replace(/(\w)(\w*)/g,
        function (g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase() })
    },
    setMoney: (state) => (money) => {
      money = money.toString().split('').reverse().join('').match(/(\d{0,3})/g)
      money.pop()
      return money.join('.').split('').reverse().join('')
    },
    getProduct: (state) => (filter) => {
      let re
      switch (filter) {
        case 'electronic':
        case 'vehicle':
        case 'tools':
        case 'clothes':
        case 'others':
          return state.products.filter(x => x.tags === filter)
        case 100:
        case 50:
        case 20:
        case 10:
        case 5:
          return state.products.filter(x => x.stock < filter)
        case '':
          return state.products
        default:
          re = RegExp(`${filter}*`, 'gi')
          return state.products.filter(x => re.test(x.name))
      }
    }
  }
})
