<template>
    <div>
      <b-card :img-src="product.image_url" img-alt="Card image" img-left class="mb-3">
        <b-card-text>
          <h5>{{ product.name }}</h5>
          <h6>Rp. {{ product.price.toLocaleString() }}</h6>
          <h6>Stock : {{ product.stock }}</h6>
        </b-card-text>
        <b-button-group class="mx-2">
          <router-link :to="'/editproduct/'+product.id " class="btn btn-md btn-outline-dark" :product="product" @click.prevent="lanjut">Edit</router-link> &nbsp;
          <b-button variant="outline-dark" @click.prevent="deleteProduct(product.id)">Delete</b-button>
        </b-button-group>
      </b-card>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Product-Card',
  props: ['product'],
  methods: {
    deleteProduct (id) {
      axios({
        method: 'DELETE',
        url: `${this.$store.state.baseUrl}/products/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((result) => {
          this.showAlertSuccess(result.data)
          this.$store.commit('fetchProducts')
          console.log(result.data)
        }).catch((err) => {
          if (err.message === 'Request failed with status code 401') {
            this.showAlertFail('Not Authorized')
          } else {
            this.showAlertFail(err.message)
          }
          console.log('error', err)
        })
    },
    showAlertFail (message) {
      this.$swal({
        icon: 'error',
        title: 'Oops...',
        text: message
      })
    },
    showAlertSuccess (message) {
      this.$swal({
        icon: 'success',
        title: 'SUCCESS',
        text: message
      })
    }
  },
  created () {
    this.$store.commit('fetchProducts')
  }
}
</script>

<style>
.card-img-left {
  width: 20vw;
  height: 30vh;
  object-fit: cover;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
  border-radius: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  border-radius: 10px;
}
</style>
