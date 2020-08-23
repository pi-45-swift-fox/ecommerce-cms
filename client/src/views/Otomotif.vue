<template>
  <div class="fashion">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Category Otomotif</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
            <b-button variant="outline-secondary" size="sm" @click.prevent="lanjut()">+ New Product</b-button>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <p class="text-secondary"> Total : {{ Otomotif.length }} products</p>
    </div>
    <div class="bv-example-row" style="overflow-y:scroll; overflow-x:hidden; height:450px; background-color: rgba(0,0,0,.03);">
      <ProductCard v-for="product in Otomotif" :key="product.id" :product="product"></ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'Otomotif',
  components: {
    ProductCard
  },
  methods: {
    showAlertFail (message) {
      this.$swal({
        icon: 'error',
        title: 'Oops...',
        text: message
      })
    },
    lanjut () {
      if (!localStorage.access_token) {
        this.showAlertFail('Not Authorized')
      } else {
        this.$router.push({ path: '/newproduct' })
      }
    }
  },
  computed: {
    Otomotif () {
      return this.$store.state.products.filter(product => {
        return product.category === 'Otomotif'
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
