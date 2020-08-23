import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import Swal from 'sweetalert';
import router from '../router/index';

Vue.use(Vuex);
const baseUrl = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    products: [],
    banners: [],
    product: [],
    banner: [],
    statusAdd: true
  },
  mutations: {
    SET_PRODUCTS (state, result) {
      state.products = result;
    },

    SET_BANNERS (state, result) {
      state.banners = result
    },

    DELETE_PRODUCT (state, result) {
      state.products = state.products.filter((product) => product.id !== result)
    },

    DELETE_BANNER(state, result) {
      state.banners = state.banners.filter((banner) => banner.id !== result);
    },

    CHANGE_FORM_STATUS(state, status) {
      state.statusAdd = status;
    },

    RESET_PRODUCT_FORM (state, status) {
      state.product = {}
      state.statusAdd = status;
      router.push({ name: 'FormProduct' })
    },

    RESET_BANNER_FORM (state, status) {
      state.banner = {}
      state.statusAdd = status;
      router.push({ name: 'FormBanner' })
    },

    FIND_PRODUCT(state, result) {
      state.product = result;
    },

    FIND_BANNER(state, result) {
      state.banner = result;
    },
  },
  actions: {
    showProducts (context) {
      Axios({
        method: 'GET',
        url: `${baseUrl}/products`,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then((product) => {
        context.commit('SET_PRODUCTS', product.data);
      })
      .catch(() => {
        Swal('Error!', 'Something went error.', 'error')
      });
    },

    showBanners(context) {
      Axios({
        method: 'GET',
        url: `${baseUrl}/banners`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
      .then((result) => {
        context.commit('SET_BANNERS', result.data);
      })
      .catch(() => {
        Swal('Error!', 'Something went error.', 'error');
      });
    },

    deleteProduct (context, id) {
      Axios({
        method: 'DELETE',
        url: `${baseUrl}/products/${id}`,
        headers: {
          access_token: localStorage.access_token
        },
      })
      .then((product) => {
        context.commit('DELETE_PRODUCT', +id);
        Swal('Success!,', `${product.data.name}`, 'success');
      })
      .catch(() => {
        swal('Error!', 'Something went error.', 'error')
      });
    },

    deleteBanner(context, id) {
      Axios({
        method: 'DELETE',
        url: `${baseUrl}/banners/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
      .then((product) => {
        context.commit('DELETE_BANNER', +id);
        swal('Success!', `${product.data.name}`, 'success');
      })
      .catch(() => {
        swal('Error!', 'Something went error.', 'error');
      });
    },

    editProduct (context, editedProduct) {
      Axios({
        method: 'PUT',
        url: `${baseUrl}/products/${editedProduct.id}`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          name: editedProduct.name,
          image_url: editedProduct.image_url,
          price: +editedProduct.price,
          stock: +editedProduct.stock,
          category: editedProduct.category
        },
      })
      .then(() => {
        Swal('Success!', `Success edit product '${editedProduct.name}'`, 'success');
        router.push({ name: 'ProductTable' })
      })
      .catch((err) => {
        const errors = err.response.data;
        Swal('Error', `${errors}`, 'error');
      });
    },

    editBanner (context, editedBanner) {
      Axios({
        method: 'PUT',
        url: `${baseUrl}/banners/${editedBanner.id}`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          name: editedBanner.name,
          image_url: editedBanner.image_url,
          description: editedBanner.description,
          status: editedBanner.status,
        },
      })
      .then(() => {
        Swal('Success!', `Success edit banner '${editedBanner.name}'`, 'success');
        router.push({ name: 'BannerTable' });
      })
      .catch((err) => {
        const errors = err.response.data;
        Swal('Error', `${errors}`, 'error');
      });
    },

    findProduct (context, id) {
      Axios({
        method: 'GET',
        url: `${baseUrl}/products/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((product) => {
          context.commit('FIND_PRODUCT', product.data);
          router.push({ name: 'FormProduct' });
        })
        .catch(() => {
          Swal('Error!', 'Something went error.', 'error');
        });
    },

    findBanner (context, id) {
      Axios({
        method: 'GET',
        url: `${baseUrl}/banners/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
      .then((product) => {
        context.commit('FIND_BANNER', product.data);
        router.push({ name: 'FormBanner' });
      })
      .catch(() => {
        Swal('Error!', 'Something went error.', 'error');
      });
    },

    addProduct (context, newProduct) {
      Axios({
        method: 'POST',
        url: `${baseUrl}/products`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          name: newProduct.name,
          image_url: newProduct.image_url,
          price: +newProduct.price,
          stock: +newProduct.stock,
          category: newProduct.category,
        },
      })
        .then(() => {
          Swal('Success!', `Success add new product '${newProduct.name}'`, 'success');
          router.push({ name: 'ProductTable' });
        })
        .catch((err) => {
          const errors = err.response.data;
          Swal('Error', `${errors}`, 'error');
        });
    },

    addBanner (context, newBanner) {
      Axios({
        method: 'POST',
        url: `${baseUrl}/banners`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          name: newBanner.name,
          image_url: newBanner.image_url,
          description: newBanner.description,
          status: newBanner.status,
        },
      })
      .then(() => {
        Swal('Success!', `Success add new banner '${newBanner.name}'`, 'success');
        router.push({ name: 'BannerTable' });
      })
      .catch((err) => {
        const errors = err.response.data;
        Swal('Error', `${errors}`, 'error');
      });
    },
  }
});
