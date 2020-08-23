<template>
  <div class="product">
    <b-container fluid>
      <div class="h-100">
        <b-card bg-variant="light">
          <b-row class="center">
            <b-col class="my-4" cols=1>
              <b-icon icon="shop" font-scale="5"></b-icon>
            </b-col>
            <b-col class="my-5">XSTORE</b-col>
            <b-col class="my-5" cols="8">
              <div>
                <b-button variant=outline-primary v-b-modal.modal-1>Create Product</b-button>
                <b-modal id="modal-1" title="BootstrapVue">
                  <form>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword1">
                    </div>
                  </form>
                </b-modal>
              </div>
            </b-col>
            <b-col class="my-5" cols=1>
              <b-button @click='logout' class="px-4 py-2 " pill variant="outline-danger">Logout</b-button>
            </b-col>
          </b-row>
        </b-card>
      </div>
      <b-container class="text-center" fluid>
        <b-row class="px-5">
          <Cards v-for="(product, index) in $store.state.products.data" :key="index" :product="product" />
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import router from '../router'
import Cards from '../components/Cards'

export default {
  name: 'Products',
  data () {

  },
  methods: {
    logout () {
      localStorage.clear()
      router.push('/')
    },
    onSubmit () {
    }
  },
  components: {
    Cards
  },
  created () {
    if (localStorage.token) {
      this.$store.commit('fetchData')
      console.log(this.$store.commit('fetchData'))
    }
  }
}

</script>

<style scoped>
*{
  margin: 0 !important;
  padding: 0 !important;
}

.product{
  height: 100vh;
}

</style>
