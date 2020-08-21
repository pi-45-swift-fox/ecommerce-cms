<template>
<div class="row">
    <div class="col-8 mx-auto">
  <table class="table table-sm table-bordered table-hover">
    <caption>
      <button @click="addNew()" class="btn btn-success">Add</button>
    </caption>
  <thead>
    <tr>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <ProductRow v-for="product in $store.state.products" :key="product.id" :product="product" />
  </tbody>
</table>
    </div>
</div>
</template>

<script>
import ProductRow from './ProductRow'

export default {
  name: 'ProductTable',
  components: {
    ProductRow
  },
  methods: {
    addNew () {
      this.$router.push('/products/add')
    }
  },
  created: function () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
.img-square {
  object-fit: cover;
  width: 80px;
  height: 80px;
}
</style>
