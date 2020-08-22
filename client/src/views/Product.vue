<template lang="html">
  <div class="product vh-100">
    <Navbar />
    <b-container fluid="xl" class="dashboard">
      <div class="grid">
        <div class="">
          <div class="grid-item-1 shadow mb-2 rounded-lg">
            <div>
              <img class="shadow profile-pic" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png">
            </div>
            <div class="profile mt-3">
              <h6>{{$store.state.userEmail}}</h6>
              <p>Total products: {{$store.getters.getProduct.length}}</p>
            </div>
          </div>
          <div class="grid-item-3 shadow mb-2 rounded-lg">
            <div>
              <div style="display: flex; align-items: baseline;">
                <h4 class="mb-3">Search product:</h4>
                <b-button style="font-size: 12px;" v-if="search.length > 0" @click="changeSearch('')" variant="danger" class="rounded-pill shadow ml-1" size="sm"><b-icon-patch-minus></b-icon-patch-minus> {{search}}</b-button>
              </div>
              <b-form inline>
                <label class="sr-only" for="inline-form-input-name">Name</label>
                <b-input
                  id="inline-form-input-name"
                  class="input mr-2 shadow"
                  v-model="searchTemp"
                  placeholder="enter product name..."
                ></b-input>
                <b-button @click="changeSearch(searchTemp)" variant="success" class="shadow"><b-icon-search></b-icon-search>  Search</b-button>
              </b-form>
            </div>
            <div class="line"></div>
            <div>
              <div style="display: flex; align-items: baseline;">
                <h4 class="mb-3">Filter by tag</h4>
                <b-button v-if="checkTag(filter)" @click="changeFilter('')" variant="danger" class="rounded-pill shadow ml-2" size="sm"><b-icon-patch-minus></b-icon-patch-minus> {{filter}}</b-button>
              </div>
              <b-button @click="changeFilter('electronic')" variant="success" class="rounded-pill mr-2 mb-2 shadow">Electronic</b-button>
              <b-button @click="changeFilter('vehicle')" variant="success" class="rounded-pill mr-2 mb-2 shadow">Vehicle</b-button>
              <b-button @click="changeFilter('tools')" variant="success" class="rounded-pill mr-2 mb-2 shadow">Tools</b-button>
              <b-button @click="changeFilter('clothes')" variant="success" class="rounded-pill mr-2 mb-2 shadow">Clothes</b-button>
              <b-button @click="changeFilter('others')" variant="success" class="rounded-pill mr-2 mb-2 shadow">Others</b-button>
            </div>
            <div class="line"></div>
            <div>
              <div style="display: flex; align-items: baseline;">
                <h4 class="mb-3">Filter by stock</h4>
                <b-button v-if="typeof filter === 'number'" @click="changeFilter('')" variant="danger" class="rounded-pill shadow ml-2" size="sm"><b-icon-patch-minus></b-icon-patch-minus> {{filter}}</b-button>
              </div>
              <b-button @click="changeFilter(100)" variant="success" class="rounded-pill mr-2 mb-2 shadow">&lt; 100</b-button>
              <b-button @click="changeFilter(50)" variant="success" class="rounded-pill mr-2 mb-2 shadow">&lt; 50</b-button>
              <b-button @click="changeFilter(20)" variant="success" class="rounded-pill mr-2 mb-2 shadow">&lt; 20</b-button>
              <b-button @click="changeFilter(10)" variant="success" class="rounded-pill mr-2 mb-2 shadow">&lt; 10</b-button>
              <b-button @click="changeFilter(5)" variant="success" class="rounded-pill mr-2 mb-2 shadow">&lt; 5</b-button>
            </div>
          </div>
        </div>
        <div>
          <div class="grid-item-2">
            <div class="">
              <h2>Welcome to your Dashboard</h2>
              <p style="font-family: 'Poppins', sans-serif; font-weight: 300;">This is where you can see your product list</p>
            </div>
            <div class="">
              <b-button variant="success" class="shadow" v-b-modal.modal-prevent-closing><b-icon-plus></b-icon-plus> Add new product</b-button>

              <b-modal
                id="modal-prevent-closing"
                ref="modal"
                title="Add new product"
                @show="resetModal"
                @hidden="resetModal"
                @ok="handleOk"
              >
                <form ref="form" @submit.stop.prevent="handleSubmit">
                  <b-form-group
                    :state="nameState"
                    label="Name"
                    label-for="name-input"
                    invalid-feedback="Name is required"
                  >
                    <b-form-input
                      id="name-input"
                      v-model="name"
                      :state="nameState"
                      placeholder="enter product name"
                      required
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    :state="image_urlState"
                    label="Image"
                    label-for="image-input"
                    invalid-feedback="Image URL is required"
                  >
                    <b-form-input
                      id="image-input"
                      v-model="image_url"
                      :state="image_urlState"
                      placeholder="enter product image url"
                      required
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    :state="priceState"
                    label="Price"
                    label-for="price-input"
                    invalid-feedback="Price is required"
                  >
                    <b-form-input
                      id="price-input"
                      v-model="price"
                      :state="priceState"
                      placeholder="enter product price"
                      type="number"
                      min="0"
                      required
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    :state="stockState"
                    label="Stock"
                    label-for="stock-input"
                    invalid-feedback="Stock is required"
                  >
                    <b-form-input
                      id="stock-input"
                      v-model="stock"
                      :state="stockState"
                      required
                      type="number"
                      min="0"
                      placeholder="enter product stock"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    :state="tagsState"
                    label="Tags"
                    label-for="tags-input"
                    invalid-feedback="Tags is required"
                  >
                  <b-form-select
                      id="tags-input"
                      :state="tagsState"
                      v-model="tags"
                      :options="options"
                      value-field="value"
                      text-field="name"
                      disabled-field="notEnabled"
                      required
                    ></b-form-select>
                  </b-form-group>
                  <b-form-group
                    label="Description"
                    label-for="description-input"
                  >
                    <b-form-textarea
                      id="description-input"
                      v-model="description"
                      placeholder="enter product description (optional)"
                    ></b-form-textarea>
                  </b-form-group>
                </form>
              </b-modal>
            </div>
          </div>
          <div class="grid-item-4 overflow-auto">
            <div v-for="product in $store.getters.getProduct(filter)" :key="product.id">
              <div class="product-item mb-2">
                <div class="">
                  <img class="product-pic" :src="product.image_url">
                </div>
                <div class="">
                  <h2>{{$store.getters.convertToPascal(product.name)}}</h2>
                  <p>Rp. {{$store.getters.setMoney(product.price)}} | {{product.stock}} left</p>
                  <router-link :to="{ name: 'ProductEach', params: { id: product.id } }">Show details</router-link> | <a href="" class="text-danger">Delete</a><br>
                  <b-button disabled pill size="sm" class="mt-2">#{{product.tags}}</b-button>
                </div>
              </div>
              <div class="line-1"></div>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Product',
  components: {
    Navbar
  },
  data () {
    return {
      products: [],
      filter: '',
      name: '',
      image_url: '',
      price: '',
      stock: '',
      tags: '',
      search: '',
      searchTemp: '',
      description: '',
      nameState: null,
      image_urlState: null,
      priceState: null,
      stockState: null,
      tagsState: null,
      options: [
        { value: '', name: 'Select one tags below', notEnabled: true },
        { value: 'electronic', name: 'Electronic' },
        { value: 'vehicle', name: 'Vehicle' },
        { value: 'tools', name: 'Tools' },
        { value: 'clothes', name: 'Clothes' },
        { value: 'others', name: 'Others' }
      ]
    }
  },
  methods: {
    setProductData () {
      this.products = this.$store.state.products
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()

      this.name ? this.nameState = true : this.nameState = false
      this.image_url ? this.image_urlState = true : this.image_urlState = false
      this.price ? this.priceState = true : this.priceState = false
      this.stock ? this.stockState = true : this.stockState = false
      this.tags ? this.tagsState = true : this.tagsState = false
      return valid
    },
    resetModal () {
      this.name = ''
      this.image_url = ''
      this.price = ''
      this.stock = ''
      this.description = ''
      this.tags = ''
      this.nameState = null
      this.image_urlState = null
      this.priceState = null
      this.stockState = null
      this.tagsState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      this.$store.dispatch('addProduct', {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        tags: this.tags,
        description: this.description
      })
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    },
    changeFilter (filter) {
      this.filter = filter
    },
    changeSearch (filter) {
      this.search = filter
      this.searchTemp = filter
      this.filter = filter
    },
    checkTag (filter) {
      switch (filter) {
        case 'electronic':
        case 'vehicle':
        case 'tools':
        case 'clothes':
        case 'others':
          return true
        default:
          return false
      }
    }
  },
  created () {
    this.$store.dispatch('fetchProduct')
    this.setProductData()
  }
}
</script>

<style lang="css" scoped>
.product {
  background-color: #FBF7ED;
  font-family: 'Alata', sans-serif;
}

.dashboard {
  min-width: 70%;
}

.grid {
  display: grid;
  grid-template-columns: 25% auto;
  grid-template-rows: auto;
  column-gap: 15px;
}

.grid-item-1 {
  background-color: #002E25;
  color: #FBF7ED;
  display: flex;
  padding:5px;
  align-items: center;
  padding-left: 10px;
}

.grid-item-2 {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.grid-item-3 {
  background-color: #002E25;
  color: #FBF7ED;
  padding: 15px;
}

.grid-item-4 {
  height: 40rem;
  padding: 10px;
}

.profile-pic {
  width: 50px;
  border-radius: 100%;
  padding: 5px;
}

.profile {
  height: 75%;
  margin-left: 10px;
}

.input {
  max-width: 60%;
}

.line {
  height: 1px;
  width: 60%;
  background-color: #FBF7ED;
  margin: 1.5em auto 0.8em auto;
}

.line-1 {
  height: 1px;
  width: 60%;
  background-color: #002E25;
  margin: 1.5em auto;
}

.product-pic {
  width: 150px;
  margin-right: 20px;
}

.product-item {
  display: flex;
}

p {
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 14px;
}
</style>
