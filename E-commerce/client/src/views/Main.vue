<template>
  <div>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">E-Commerce</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
      <b-button type="button" @click.prevent="logout" variant="primary">Logout</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
    <h1>Main Page</h1>
    <products></products>
  </div>
</template>

<script>
import products from '../components/Products.vue'
export default {
  components: {
    products
  },
  methods: {
    getProducts () {
      this.$store.dispatch('readProducts', {})
    },
    logout () {
      this.$store.dispatch('logout', {})
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style>

</style>
