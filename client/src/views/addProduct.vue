<template>
  <div class="container">
    <Navbar/>
    <div class="row justify-content-center mt-5">
        <div class="col-8">
            <form @submit.prevent="addProduct">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="name"
                        placeholder="e.g: Harimau di Dalam Kubur">
                </div>
                <div class="form-group">
                  <label>Image URL</label>
                  <input type="text" class="form-control" v-model="image_url"
                        placeholder="The most powerful scene in a movie">
                </div>
                <div class="form-group">
                    <label>Price</label>
                    <input type="number" class="form-control" v-model="price">
                </div>
                <div class="form-group">
                    <label>Stock</label>
                    <input type="number" class="form-control" v-model="stock">
                </div>
                <button type="submit" class="btn btn-outline-success">Create</button>
                <a class="btn btn-outline-info ml-3" @click="cancel">Cancel</a>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/navbar'
import axios from 'axios'
import swal from 'sweetalert'

export default {
  Name: 'Add Product',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: '',
      newProduct: {}
    }
  },
  components: {
    Navbar
  },
  methods: {
    addProduct () {
      this.newProduct = {
        name: this.name,
        image_url: this.image_url,
        price: +this.price,
        stock: +this.stock
      }
      axios({
        method: 'post',
        url: this.$store.state.baseUrl + '/products',
        headers: { accesstoken: localStorage.token },
        data: this.newProduct
      })
        .then(() => {
          console.log('succes add')
          this.$store.dispatch('fetchData')
          this.$router.push({ name: 'Home' })
          swal('Success', 'Product succes added', 'success', { buttons: false })
        })
        .catch(err => {
          swal('Opppsss', 'required Name, image must be URL, price & stock minimum 1', 'error', { buttons: false })
          console.log(err, '<<<<<<')
        })
    },
    cancel () {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>

</style>
