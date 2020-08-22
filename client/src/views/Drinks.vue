<template>
  <div class="fashion">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Category Drinks</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <router-link to="/newproduct" type="button"  class="btn btn-sm btn-outline-secondary">+ New Product</router-link>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <p class="text-secondary"> Total : {{ Drinks.length }} products</p>
    </div>
    <div class="bv-example-row" style="overflow-y:scroll; overflow-x:hidden; height:450px; background-color: rgba(0,0,0,.03);">
      <ProductCard v-for="product in Drinks" :key="product.id" :product="product"></ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'Drinks',
  components: {
    ProductCard
  },
  computed: {
    Drinks () {
      return this.$store.state.products.filter(product => {
        return product.category === 'Drinks'
      })
    }
  },
  mounted () {
    this.$store.commit('fetchProducts')
  }
}
</script>

<style scoped>

</style>
