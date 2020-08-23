import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // baseUrl: 'https://ecommerce-cms-izzul.herokuapp.com',
    baseUrl: 'http://localhost:3000',
    products: [],
    product: {}
  },
  mutations: {
    fetchProducts (state) {
      axios({
        method: 'GET',
        url: `${state.baseUrl}/products`
      })
        .then(result => {
          state.products = result.data
        })
        .catch(err => {
          console.log('error', err)
        })
    },
    SET_SELECTED_PRODUCT (state, selected) {
      state.product = selected
    },
    SET_PRODUCT (state, selected) {
      state.product = selected
    }
  },
  actions: {
    getProduct ({ commit, state }, id) {
      axios({
        method: 'GET',
        url: state.baseUrl + `/products/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((result) => {
          commit('SET_SELECTED_PRODUCT', result.data)
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
