import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    products: [],
    name: '',
    image_url: '',
    price: 0,
    stock: 0,
    category: ''
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
    updateName (state, newName) {
      state.name = newName
    },
    updateImage_url (state, newImage) {
      state.image_url = newImage
    },
    updatePrice (state, newPrice) {
      state.price = newPrice
    },
    updateStock (state, newStock) {
      state.stock = newStock
    },
    updateCategory (state, newCategory) {
      state.category = newCategory
    }
  },
  actions: {
  },
  modules: {
  }
})
