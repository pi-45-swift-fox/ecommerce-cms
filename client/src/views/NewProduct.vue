<template>
  <div class="container mt-5">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Name :"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="name"
          placeholder="Enter name new product"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Image Url :" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.image_url"
          placeholder="Enter image url new product"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Price :" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.price"
          placeholder="Enter price new product"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Stock :" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.stock"
          placeholder="Enter stock new product"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Category :" label-for="input-5">
        <b-form-select
          id="input-5"
          v-model="form.category"
          :options="categories"
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="outline-primary">Submit</b-button>
      &nbsp;
      <b-button type="reset" variant="outline-danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NewProduct',
  data () {
    return {
      form: {
        name: '',
        image_url: '',
        price: '',
        stock: '',
        category: ''
      },
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
      ],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios({
        method: 'POST',
        url: `${this.$store.state.baseUrl}/products`,
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
          console.log('error', err.response.data.message)
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
}
</script>

<style>

</style>
