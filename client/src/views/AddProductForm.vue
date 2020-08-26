<template>
    <div class="row mx-auto">
    <div class="col-md-5 mx-auto">
      <div id="first">
        <div class="myform form">
          <div class="logo mb-3">
            <div class="col-md-12 text-center">
              <h1 class="text">Add New Product</h1>
            </div>
          </div>
          <form action method="post" name="login" @submit.prevent="submit">
            <div class="form-group">
              <label for="exampleInputEmail1" class="text">Name</label>
              <input
                type="name"
                name="name"
                class="form-control"
                v-model="name"
                aria-describedby="emailHelp"
                placeholder="Enter product name"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="text">Image Url</label>
              <input
                type="url"
                name="img_url"
                v-model="image_url"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Paste the image url here"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="text">Price</label>
              <input
                type="number"
                name="name"
                class="form-control"
                v-model="price"
                aria-describedby="emailHelp"
                placeholder="0"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="text">Stock</label>
              <input
                type="number"
                name="name"
                class="form-control"
                v-model="stock"
                aria-describedby="emailHelp"
                placeholder="0"
              />
            </div>
            <br />
            <div class="col-md-12 text-center">
              <input type="submit" class="btn btn-block mybtn btn-primary tx-tfm" value="Add" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddProduct',
  data () {
    return {
      name: '',
      image_url: '',
      stock: null,
      price: null
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('addProduct', {
        name: this.name,
        image_url: this.image_url,
        stock: this.stock,
        price: this.price
      }) // then ini harus diganti async await agar bisa membuka peluang kehidupan baru
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>

<style>

</style>
