<template>
  <div class="ml-4 mb-4">
    <b-card
      :title="this.product.name"
      :img-src="this.product.image_url"
      img-top
      style="max-width: 20rem;"
      class=""
      bg-variant="dark"
    >
      <b-card-text>{{`Rp. ${product.price.toLocaleString()}`}}</b-card-text>
      <b-card-text>stock : {{product.stock}}</b-card-text>

      <div class="d-flex justify-content-sm-around">
        <b-button variant="outline-secondary" @click="editProduct">Edit</b-button>
        <b-button variant="outline-secondary" @click="deleteProduct">Delete</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'Products',
  props: ['product'],
  methods: {
    deleteProduct () {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this imaginary file!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            console.log('masuk function delete')
            this.$store.dispatch('deleteProduct', this.product.id)
          }
        })
    },
    editProduct () {
      this.$router.push({ path: `/editProduct/${this.product.id}` })
      this.$store.commit('SET_PRODUCT', this.product)
    }
  }
}
</script>

<style>

</style>
