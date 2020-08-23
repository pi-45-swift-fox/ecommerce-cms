<template>
  <div class="home">
    <div id="nav">
      <button @click.prevent="$store.commit('logout')" type="button" class="btn btn-danger">LOGOUT</button>
    </div>
    <AddProductModal/>
    <table class="table container">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Product Name</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
        </tr>
      </thead>
      <tbody>
        <ProductRow v-for="product in this.$store.state.products" :key="product.id" :product="product" />
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductRow from '../components/ProductRow.vue'
import AddProductModal from '../components/AddProductModal.vue'
import router from '../router'

export default {
  name: 'Home',
  components: {
    ProductRow,
    AddProductModal
  },
  created () {
    if (!localStorage.getItem('access_token')) {
      router.push({ name: 'LoginPage' })
    } else {
      this.$store.commit('fetchProducts')
    }
  }
}
</script>
