<template>
    <tr>
        <td><img class="img-square" :src=product.image_url alt=""></td>
        <td class="">{{ product.name }}</td>
        <td>Rp. {{ product.price.toLocaleString() }}</td>
        <td>{{ product.stock }}</td>
        <td>
          <button type="button" class="btn btn-info" @click="editProduct()">Edit</button>
          <button type="button" class="btn btn-danger" @click="deleteProduct()">Delete</button>
        </td>
    </tr>
</template>

<script>
export default {
  name: 'ProductRow',
  props: {
    product: Object
  },
  methods: {
    editProduct () {
      this.$router.push(`/products/${this.product.id}`)
      this.$store.dispatch('editProduct', { id: this.product.id, name: this.product.name, image_url: this.product.image_url, price: this.product.price, stock: this.product.stock })
    },
    deleteProduct () {
      this.$store.dispatch('deleteProduct', this.product.id)
    }
  }
}
</script>

<style>

</style>
