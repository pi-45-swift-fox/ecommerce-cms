<template>
  <div>
    <h2>Products</h2>
    <b-button type="button" @click.prevent="addProduct" variant="primary">Add Product</b-button>
    <div class="col-3">
      <Card v-for="(product,i) in $store.state.Products" :key="i" :product = "product"></Card>
  </div>
  </div>
</template>

<script>
import Card from './ProductCards'
export default {
  components: {
    Card
  },
  methods: {
    getProducts () {
      this.$store.dispatch('readProducts', {})
    },
    addProduct () {
      this.$store.dispatch('showAddProduct', {})
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style>

</style>
