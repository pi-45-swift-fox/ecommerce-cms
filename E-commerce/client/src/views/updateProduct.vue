<template>
  <div>
      <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
      <b-button type="button" @click.prevent="logout" variant="primary">Logout</b-button>
      <b-button type="button" @click.prevent="mainPage" variant="primary">Go to Main Page</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
      <b-form @submit.prevent="onSubmit" @reset="reset">
        <h2>Update Product</h2>
      <b-form-group
        id="input-group-1"
        label="Product's name:"
        label-for="input-1"
        description=":=)"
      >
        <b-form-input
          id="input-1"
          v-model="name"
          type="text"
          required
          placeholder="enter product's name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Product's price:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="price"
          required
          placeholder="Enter Price"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Product's image:"
        label-for="input-3"
        description="input product's url"
      >
        <b-form-input
          id="input-3"
          v-model="image_url"
          type="text"
          required
          placeholder="image url"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Product's stock:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="stock"
          required
          placeholder="Enter Stock"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0"></pre>
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      price: 0,
      image_url: '',
      stock: 0
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('updateProduct', { id: this.$store.state.updatedProduct.id, name: this.name, price: this.price, image_url: this.image_url, stock: this.stock })
      this.reset()
    },
    reset () {
      this.name = ''
      this.price = 0
      this.image_url = ''
      this.stock = 0
    },
    defaultValue () {
      this.name = this.$store.state.updatedProduct.name
      this.price = this.$store.state.updatedProduct.price
      this.image_url = this.$store.state.updatedProduct.image_url
      this.stock = this.$store.state.updatedProduct.stock
    },
    logout () {
      this.$store.dispatch('logout', {})
    },
    mainPage () {
      this.$store.commit('BACK_TO_MAIN')
    }
  },
  created () {
    this.defaultValue()
  }
}
</script>

<style>

</style>
