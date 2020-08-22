<template>
  <div class="content">
    <div class="cards d-flex justify-content-center flex-wrap">
        <Cards v-for="product in products" :key="product.name" :cards="product" />
    </div>
  </div>
</template>

<script>
import Cards from './Cards.vue';

export default {
  name: 'Content',
  components: {
    Cards,
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  created() {
    this.$store.dispatch('getProducts');
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.content{
  width: 100%;
  height: 400px;
}
</style>
