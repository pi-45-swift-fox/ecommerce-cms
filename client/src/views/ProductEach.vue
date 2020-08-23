<template lang="html">
  <div class="product vh-100">
    <Navbar />
    <b-container fluid="xl" class="dashboard shadow-lg rounded-lg">
      <router-link style="color: #FBF7ED; font-size: 20px;" to="/products"><b-icon icon="arrow-left-short"></b-icon> back to dashboard</router-link>
      <div class="product-item mt-4 mb-4">
        <div class="" style="display: flex;">
          <img class="shadow-lg mr-4" :src="this.$store.state.eachProduct.image_url" alt="">
          <div class="line mr-4">
          </div>
        </div>
        <div class="mt-2">
          <h1>{{$store.getters.convertToPascal(this.$store.state.eachProduct.name)}}</h1><hr>
          <h3>Price : Rp. {{$store.getters.setMoney(this.$store.state.eachProduct.price)}}</h3>
          <h3>Stock : {{this.$store.state.eachProduct.stock}}</h3>
          <b-button disabled pill size="lg" variant="light" class="ml-1 mt-2"># {{this.$store.state.eachProduct.tags}}</b-button><hr>
          <div class="mt-4 button-group">
            <b-button pill size="lg" variant="success" class="ml-1 mr-3 mb-2" v-b-modal.modal-prevent-closing-edit>edit product</b-button>
            <b-button @click="showMsgBoxTwo" pill size="lg" variant="danger">delete product</b-button>

            <b-modal
              id="modal-prevent-closing-edit"
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
      </div>
      <div class="description text-break">
        <h1>Description</h1>
        <div class="line-1 mt-4 mb-2"></div>
        <h3 v-if="this.$store.state.eachProduct.description !== ''">{{this.$store.state.eachProduct.description}}</h3>
        <h3 v-else>there is nothing to see here...</h3>
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import router from '@/router'

export default {
  name: 'ProductEach',
  data () {
    return {
      boxTwo: '',
      name: '',
      image_url: '',
      price: '',
      stock: '',
      tags: '',
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
  components: {
    Navbar
  },
  methods: {
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
      this.name = this.$store.state.eachProduct.name
      this.image_url = this.$store.state.eachProduct.image_url
      this.price = this.$store.state.eachProduct.price
      this.stock = this.$store.state.eachProduct.stock
      this.description = this.$store.state.eachProduct.description
      this.tags = this.$store.state.eachProduct.tags
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
      this.$store.dispatch('editProduct', {
        id: this.$route.params.id,
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
    showMsgBoxTwo () {
      this.boxTwo = ''
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete.', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          this.boxTwo = value
          console.log('test masuk')
          if (this.boxTwo) {
            this.$store.dispatch('deleteProduct', this.$route.params.id)
            router.push({ name: 'Products' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.$store.dispatch('getOneProduct', this.$route.params.id)
  }
}
</script>

<style lang="css" scoped>
.product {
  background-color: #FBF7ED;
  font-family: 'Alata', sans-serif;
  color: #FBF7ED;
}

.dashboard {
  background-color: #002E25;
  margin-top: 4rem;
  padding: 50px;
}

.product-item {
  display: flex;
}

.line {
  width: 1px;
  height: 350px;
  background-color: #FBF7ED;
}

.line-1 {
  height: 1px;
  width: 50%;
  background-color: #FBF7ED;
}

.description {
  width: 100%;
}

.button-group {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
}

img {
  width: 350px;
}

@media (max-width: 576px) {
  .line {
    height: 150px;
  }

  img {
    width: 150px;
    height: 150px;
  }
}
</style>
