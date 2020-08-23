import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    products: [],
    product: ''
  },
  mutations: {
    SET_DATA (state, data) {
      state.products = data
    },
    SET_PRODUCT (state, product) {
      state.product = product
    }
  },
  actions: {
    fetchData ({ commit }) {
      axios({
        method: 'get',
        url: this.state.baseUrl + '/products',
        headers: { accesstoken: localStorage.token }
      })
        .then(data => {
          commit('SET_DATA', data.data)
        })
    },
    deleteProduct (context, id) {
      axios({
        method: 'delete',
        url: this.state.baseUrl + '/products/' + id,
        headers: { accesstoken: localStorage.token }
      })
        .then(() => {
          swal('Manntappp', 'Product success delete', 'success', { buttons: false })
          context.dispatch('fetchData')
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
