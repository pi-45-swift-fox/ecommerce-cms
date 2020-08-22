<template>
  <div class="container main bg-black">
      <div>
        <h1>Add New Product</h1>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
            id="input-group-1"
            label="Product Name:"
            label-for="input-1"
        >
            <b-form-input
            id="input-1"
            v-model="form.name"
            required
            placeholder="Enter name"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Image Url:" label-for="input-2">
            <b-form-input
            id="input-2"
            v-model="form.image_url"
            required
            placeholder="Enter product image Url / Link"
            type="url"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Sell Price:" label-for="input-3">
            <b-form-input
            id="input-3"
            v-model="form.price"
            required
            placeholder="Enter product sell price"
            type="number"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Stock:" label-for="input-4">
            <b-form-input
            id="input-4"
            v-model="form.stock"
            required
            placeholder="Enter product available stock"
            type="number"
            ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="mr-5">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
  </div>
</template>

<script>

import swal from 'sweetalert'
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        image_url: '',
        name: '',
        price: null,
        stock: null
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      const newProduct = {
        image_url: this.form.image_url,
        name: this.form.name,
        price: +this.form.price,
        stock: +this.form.stock
      }
      axios({
        method: 'POST',
        url: this.$store.state.baseUrl + '/products',
        data: newProduct,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          this.$store.dispatch('fetchProducts')
          swal('Ok!', 'Successfully added!', 'success')
          this.$router.push({ path: '/products' })
        })
        .catch(err => {
          if (err.message === 'Request failed with status code 400') {
            swal('Now Allowed!', 'Minimum Price and Stock is 1', 'error')
          }
        })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.image_url = ''
      this.form.name = ''
      this.form.price = null
      this.form.stock = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');

h1 {
  color:#ffce00;
  font-family: 'Oswald', sans-serif;
  font-size: 50px;
  text-shadow: 2px 2px 4px darkgoldenrod;
}

h1:hover {
  text-shadow: 2px 2px 4px #000000;
}

.main {
  color: white;
}

.bg-black {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 86vh;
  width: 95vw;
  color: #c0ccd4;
  font-family: 'Cardo', serif;
  text-shadow: 2px 2px 4px #000000;
}
</style>
