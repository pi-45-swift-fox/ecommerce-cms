import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    fetchData (state) {
      if (localStorage.token) {
        axios({
          url: 'http://localhost:3000/products',
          method: 'get',
          headers: {
            access_token: localStorage.token
          }
        })
          .then(({ data }) => {
            state.products = data
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  actions: {},
  modules: {}
})
