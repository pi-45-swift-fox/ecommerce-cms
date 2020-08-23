<template>
  <div class="cardProduct">
  <b-card
    :title="product.name"
    :img-src="product.image_url"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      Product's Price is {{product.price}}
    </b-card-text>
    <div>
      <b-button @click.prevent="updateProduct" variant="primary">Update</b-button>
      <b-button @click.prevent="deleteProduct" variant="primary">Delete</b-button>
    </div>
  </b-card>
</div>
</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      price: toString(this.product.price)
    }
  },
  methods: {
    deleteProduct () {
      this.$store.dispatch('deleteProduct', this.product.id)
    },
    updateProduct () {
      this.$store.commit('showUpdateProduct', this.product.id)
    }
  }
}
</script>

<style>
  .mb-2 {
    background-color: transparent;
  }
</style>
