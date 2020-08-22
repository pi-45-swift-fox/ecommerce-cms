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
            <b-button pill size="lg" variant="success" class="ml-1 mr-3 mb-2">edit product</b-button>
            <b-button pill size="lg" variant="danger">delete product</b-button>
          </div>
        </div>
      </div>
      <div class="description text-break">
        <h1>Description</h1>
        <div class="line-1 mt-4 mb-2"></div>
        <h3>{{this.$store.state.eachProduct.description}}</h3>
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'ProductEach',
  components: {
    Navbar
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
