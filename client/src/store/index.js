import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../api/axios'
import swal from 'sweetalert2'

const Toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    edit: {
      product: {}
    },
    login: false
  },
  mutations: {
    set_current_state (state, val) {
      if (val) {
        state.login = true
      } else {
        state.login = false
      }
    },
    set_products (state, products) {
      state.products = products
    },
    set_edit_product (state, product) {
      state.edit.product = product
    },
    updateName (state, name) {
      state.edit.product.name = name
    },
    updateImg (state, name) {
      state.edit.product.image_url = name
    },
    updateStock (state, name) {
      state.edit.product.stock = name
    },
    updatePrice (state, name) {
      state.edit.product.price = name
    }
  },
  actions: {
    // checkLogin ({ commit }, status) {
    //   if (status) {
    //     commit('set_current_state', true)
    //   } else {
    //     commit('set_current_state', false)
    //   }
    // }, Lupa ini apa, sementara di comment
    async login ({ commit }, { email, password }) {
      await axios.post('/login', {
        email,
        password
      })
        .then(response => {
          commit('set_current_state', true)
          localStorage.access_token = response.data.token
        })
        .catch(error => {
          commit('set_current_state', false)
          if (error.response) {
            if (error.response.status === 401) {
              Toast.fire({
                icon: 'error',
                title: 'Incorrect E-mail or Password'
              })
            }
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
        })
    },
    logout ({ commit }) {
      localStorage.removeItem('access_token')
      commit('set_current_state', false)
    },
    addProduct ({ dispatch }, product) {
      axios({
        url: '/products',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: product.name,
          image_url: product.image_url,
          stock: product.stock,
          price: product.price
        }
      })
        .then(response => {
          Toast.fire({
            icon: 'success',
            title: 'Successfully added new product'
          })
          dispatch('fetchProducts')
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 403) {
              swal.fire('Unauthorized', 'You need to login as admin first', 'info')
            } else if (error.response.status === 400) {
              Toast.fire({
                icon: 'error',
                title: error.response.data.msg
              })
            }
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
        })
    },
    editProduct ({ dispatch }, product) {
      axios({
        url: `/products/${product.id}`,
        method: 'PUT',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: product.name,
          image_url: product.image_url,
          stock: product.stock,
          price: product.price
        }
      })
        .then(response => {
          dispatch('fetchProducts')
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 403) {
              swal.fire('Unauthorized', 'You need to login as admin first', 'info')
            } else if (error.response.status === 400) {
              Toast.fire({
                icon: 'error',
                title: error.response.data.msg
              })
            }
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
        })
    },
    deleteProduct ({ dispatch }, id) {
      axios({
        url: `/products/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          Toast.fire({
            icon: 'success',
            title: 'Successfully deleted the product!'
          })
          dispatch('fetchProducts')
        })
        .catch(error => {
          if (error.response.status === 403) {
            swal.fire('Unauthorized', 'You need to login as admin first', 'info')
          } else {
            Toast.fire({
              icon: 'warning',
              title: 'Whoops, something went wrong! Check console and contact the developer'
            })
            console.log(error)
          }
        })
    },
    fetchProducts ({ commit }) {
      axios.get('/products')
        .then(response => {
          const data = response.data

          commit('set_products', data)
        })
        .catch(error => {
          Toast.fire({
            icon: 'warning',
            title: 'Whoops, something went wrong! Check console and contact the developer'
          })
          console.log(error)
        })
    },
    fetchSingleProduct ({ commit }, id) {
      axios.get(`products/${id}`)
        .then(response => {
          const data = response.data

          commit('set_edit_product', data)
        })
        .catch(error => {
          Toast.fire({
            icon: 'warning',
            title: 'Whoops, something went wrong! Check console and contact the developer'
          })
          console.log(error)
        })
    }
  },
  modules: {
  }
})
