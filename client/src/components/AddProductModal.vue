<template>
  <div>
          <!-- Button trigger modal -->
    <button type="button" class="btn btn-outline-dark conteiner btn-lg btn-block container" data-toggle="modal" data-target="#exampleModal">
      CLICK HERE TO ADD PRODUCT
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
        <form @submit.prevent="submitProduct">
          <div class="form-group">
            <label for="exampleInputEmail1">Product Name</label>
            <input v-model="name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter The Product Name">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Image Url</label>
            <input v-model="image_url" type="text" class="form-control" id="exampleInputPassword1" placeholder="Image Url">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Price</label>
            <input v-model="price" type="number" class="form-control" id="exampleInputPassword1" placeholder="Price">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Stock</label>
            <input v-model="stock" type="number" class="form-control" id="exampleInputPassword1" placeholder="Stock">
          </div>
          <button type="submit" class="btn btn-dark">Submit</button>
        </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddProductModal',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
  },
  methods: {
    submitProduct () {
      this.$store.commit('addProduct', { name: this.name, image_url: this.image_url, price: this.price, stock: this.stock })
      this.$store.commit('fetchProducts')
      this.name = ''
      this.image_url = ''
      this.price = ''
      this.stock = ''
    }
  }
}
</script>

<style>

</style>
