<template>
  <div>
  <b-card class="h-100 mx-4 my-4" :title=product.name
    :img-src=product.image_url
    img-top
    tag="article"
    style="max-width: 20rem;"
  >
  Price : {{product.price}}
  <br>
  <br>
  stock : {{product.stock}}
  <br>
  <br>
    <b-row>
    <b-col><b-button @click.prevent='updateProduct(product.id)' variant="outline-primary">Primary</b-button></b-col>
    <b-col>Update</b-col>
    <b-col><b-button @click.prevent='deleteProduct(product.id)' variant="outline-danger">Delete</b-button></b-col>
  </b-row>
  </b-card>
</div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  props: ['product'],
  methods: {
    deleteProduct (id) {
      axios({
        url: `http://localhost:3000/products/${id}`,
        method: 'delete',
        headers: {
          access_token: localStorage.token
        }
      })
        .then(res => {
          this.$store.commit('fetchData')
          router.push('/products')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
