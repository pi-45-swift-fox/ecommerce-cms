import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'https://young-bayou-36530.herokuapp.com/',
    products: [],
    product: {},
    isLogin: false
  },
  mutations: {
    SET_PRODUCTS (state, newProducts) {
      state.products = newProducts
    },
    SET_SELECTED_PRODUCT (state, selectedProduct) {
      state.product = selectedProduct
    },
    SET_PRODUCT (state, selectedProduct) {
      state.product = selectedProduct
    },
    SET_ISLOGIN (state, status) {
      state.isLogin = status
    }
  },
  actions: {
    fetchProducts ({ commit, state }) {
      axios({
        method: 'GET',
        url: state.baseUrl + '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          commit('SET_PRODUCTS', res.data.products)
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getProduct ({ commit, state }, id) {
      try {
        const getProduct = await axios({
          method: 'GET',
          url: state.baseUrl + `/products/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        commit('SET_SELECTED_PRODUCT', getProduct.data.product)
      } catch (err) {
        console.log(err)
      }
    },
    async deleteProduct ({ dispatch, state }, id) {
      try {
        const deleteProduct = await axios({
          method: 'DELETE',
          url: `${state.baseUrl}/products/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        if (deleteProduct) {
          dispatch('fetchProducts')
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {
  }
})
