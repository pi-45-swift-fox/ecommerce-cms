<template>
  <div>
    <div class="container mt-5">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" >
        <b-form-group
          id="input-group-1"
          label="Name New Product :"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Image Url New Product :" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.image_url"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Price New Product:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.price"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Stock New Product:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.stock"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5" label="Category :" label-for="input-5">
        <b-form-select
          id="input-5"
          v-model="form.category"
          :options="categories"
        ></b-form-select>
      </b-form-group>

        <b-button type="submit" variant="outline-success">Submit</b-button>
        &nbsp;
        <b-button type="reset" variant="outline-danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditProduct',
  data () {
    return {
      form: {
        name: this.$store.state.product.name,
        image_url: this.$store.state.product.image_url,
        price: this.$store.state.product.price,
        stock: this.$store.state.product.stock,
        category: this.$store.state.product.category
      },
      show: true,
      categories: [
        { text: 'Select One', value: '' },
        { text: 'Fashion', value: 'Fashion' },
        { text: 'Books', value: 'Books' },
        { text: 'Electronics', value: 'Electronics' },
        { text: 'Otomotif', value: 'Otomotif' },
        { text: 'Foods', value: 'Foods' },
        { text: 'Drinks', value: 'Drinks' },
        { text: 'Furniture', value: 'Furniture' },
        { text: 'Others', value: 'Others' }
      ]
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios({
        method: 'PUT',
        url: `${this.$store.state.baseUrl}/products/${this.$route.params.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: this.form
      })
        .then((result) => {
          this.$store.commit('fetchProducts')
          this.showAlertSuccess(result.data)
          console.log('berhasil', result.data)
        }).catch((err) => {
          if (err.message === 'Request failed with status code 401') {
            this.showAlertFail('Not Authorized')
          } else {
            this.showAlertFail(err.response.data.message)
          }
          console.log('error', err)
        })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.image_url = ''
      this.form.price = ''
      this.form.stock = ''
      this.form.category = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    showAlertFail (message) {
      this.$swal({
        icon: 'error',
        title: 'Oops...',
        text: message
      })
    },
    showAlertSuccess (message) {
      this.$swal({
        icon: 'success',
        title: 'SUCCESS',
        text: message
      })
    }
  }
  // beforeCreate () {
  //   this.$store.dispatch('getProduct', this.$route.params.id)
  // }
  // created () {
  //   this.$store.dispatch('getProduct', this.$route.params.id)
  // }
  // beforeMount () {
  //   this.$store.dispatch('getProduct', this.$route.params.id)
  // }
  // mounted () {
  //   this.$store.dispatch('getProduct', this.$route.params.id)
  // }
}
</script>

<style>

</style>
