import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: false,
    openAdd: false,
    openEdit: false,
    products: [],
    editProduct: {},
  },
  mutations: {
    SET_LOGGED(state, payload) {
      state.logged = payload;
    },
    SET_OPENADD(state, payload) {
      state.openAdd = payload;
    },
    SET_OPENEDIT(state, payload) {
      state.openEdit = payload;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_EDITPRODUCT(state, payload) {
      state.editProduct = payload;
    },
    UPDATE_NAME(state, payload) {
      state.editProduct.name = payload;
    },
  },
  actions: {
    Logged(context) {
      context.commit('SET_LOGGED', true);
    },
    LoggedOut(context) {
      context.commit('SET_LOGGED', false);
    },
    openAddpage(context) {
      context.commit('SET_OPENADD', true);
    },
    openEditpage(context, payload) {
      console.log(payload);
      context.commit('SET_OPENEDIT', true);
      return axios({
        method: 'GET',
        url: `http://localhost:3000/products/${payload}`,
        headers: {
          access_token: localStorage.access_token,
        }
      })
        .then((result) => {
          console.log(result, "<<open edit");
          context.commit('SET_EDITPRODUCT', result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeEditpage(context, payload) {
      context.commit('SET_OPENEDIT', false);
    },
    closeAddpage(context, payload) {
      context.commit('SET_OPENADD', false);
    },
    login(context, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then(((result) => {
          localStorage.setItem('access_token', result.data.access_token);
          context.commit('SET_LOGGED', true);
        }));
    },
    getProducts(context) {
      return axios({
        method: 'GET',
        url: 'http://localhost:3000/products',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          context.commit('SET_PRODUCTS', result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addStock(context, payload) {
      console.log(payload.stock);
      return axios({
        method: 'PUT',
        url: `http://localhost:3000/products/${payload.id}`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          price: payload.price,
          image_url: payload.image_url,
          name: payload.name,
          stock: payload.stock,
        },
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    edit(context, payload) {
      return axios({
        method: 'PUT',
        url: `http://localhost:3000/products/${payload.id}`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          id: payload.id,
          name: payload.name,
          image_url: payload.image_url,
          description: payload.description,
          stock: payload.stock,
          price: payload.price,
          genre: payload.genre,
        },
      })
        .then((result) => {
          context.commit('SET_EDITPRODUCT', result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addProduct(context, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/products',
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          description: payload.description,
          stock: payload.stock,
          price: payload.price,
          genre: payload.genre,
        },
      })
        .then((result) => {
          if (!result.data.name || result.data.image_url || result.data.description || result.data.stock || result.data.price || result.data.genre) {
            context.commit('SET_PRODUCTS', result.data);
          } else {
            context.commit('SET_PRODUCTS', 'sadasdas');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct(context, payload) {
      return axios({
        method: 'DELETE',
        url: `http://localhost:3000/products/${payload}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          context.commit('SET_PRODUCTS', result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {
  },
});
