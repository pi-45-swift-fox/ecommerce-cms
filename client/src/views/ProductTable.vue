<template>
    <div>
        <h2>List Of Product</h2>
        <div class="info">
          <table class="table">
              <thead class="thead-dark">
                  <tr class="text-center">
                      <th scope="col">No.</th>
                      <th scope="col">Product's Name</th>
                      <th scope="col">Display</th>
                      <th scope="col">Price</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Category</th>
                      <th scope="col">Option</th>
                  </tr>
              </thead>
              <tbody class="table-bordered">
                <tableDataProduct v-for="(product, index) in $store.state.products"
                :key="index" :product="product" :index="index"></tableDataProduct>
              </tbody>
          </table>
        </div>
    </div>
</template>

<script>
import TableDataProduct from '../components/TableDataProduct';

export default {
  name:"ProductTable",
  components: {
    TableDataProduct,
  },
  created() {
    this.$store.dispatch('showProducts')
  },
};
</script>

<style>
h2 {
  background: none;
  color: aliceblue;
  margin: 10px 20px;
  font-weight: bold;
  text-decoration: underline;
  text-align: center;
}
</style>