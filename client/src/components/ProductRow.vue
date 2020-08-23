<template>
  <tr>
    <td>
      <img :alt="this.product.name" :src="this.product.image_url" />
      <div>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target="#editModal"
        >EDIT</button>
        <div
          class="modal fade"
          id="editModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <form @submit.prevent="editProduct">
                <div class="form-group">
                  <label for="exampleInputEmail1">Product Name</label>
                  <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Image Url</label>
                  <input
                    v-model="image_url"
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Price</label>
                  <input
                    v-model="price"
                    type="number"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Stock</label>
                  <input
                    v-model="stock"
                    type="number"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <button type="submit" class="btn btn-dark">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <button
          @click.prevent="deleteProduct(product.id)"
          type="button"
          class="btn btn-danger btn-sm"
        >DELETE</button>
      </div>
    </td>
    <td>{{this.product.name}}</td>
    <td>Rp. {{this.product.price.toLocaleString()}}</td>
    <td>{{this.product.stock}}</td>
  </tr>
</template>

<script>
import router from '../router'

export default {
  name: 'ProductRow',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
  },
  props: ['product'],
  methods: {
    deleteProduct (productId) {
      this.$store.commit('deleteProduct', productId)
      this.$store.commit('fetchProducts')
    },
    editProduct () {
      this.$store.commit('editProduct', { id: this.product.id, name: this.name, image_url: this.image_url, price: this.price, stock: this.stock })
      this.$store.commit('fetchProducts')
      router.push({ name: 'Home' })
    }
  },
  created () {
    this.name = this.product.name
    this.image_url = this.product.image_url
    this.price = this.product.price
    this.stock = this.product.stock
  }
}
</script>

<style scoped>
img {
  max-height: 200px;
  width: auto;
}
</style>
