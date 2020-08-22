<template>
  <div>
    <div class="container mt-5">
      <p>Data Before</p>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Image Url</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{{editProduct[0].name}}</th>
            <td>{{editProduct[0].image_url}}/td>
            <td>{{editProduct[0].price}}</td>
            <td>{{editProduct[0].stock}}</td>
            <td>{{editProduct[0].category}}</td>
          </tr>
        </tbody>
      </table>
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
            :placeholder="editProduct[0].name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Image Url New Product :" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.image_url"
            :placeholder="editProduct[0].image_url"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Price New Product:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.price"
            :placeholder="editProduct[0].price"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Stock New Product:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.stock"
            :placeholder="editProduct[0].stock"
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
  props: ['product'],
  data () {
    return {
      form: {
        name: '',
        image_url: '',
        price: '',
        stock: '',
        category: ''
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
  computed: {
    editProduct () {
      return this.$store.state.products.filter(product => {
        return product.id === +this.$route.params.id
      })
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
      this.form.category = null
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
  },
  mounted () {
    this.$store.commit('fetchProducts')
  }
}
</script>

<style>

</style>
