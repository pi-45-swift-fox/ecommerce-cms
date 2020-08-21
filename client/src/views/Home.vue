<template>
  <div class="home">
    <ProductTable />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductTable from '@/components/ProductTable.vue'

export default {
  name: 'Home',
  components: {
    ProductTable
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('set_current_state', true)
    } else {
      this.$store.commit('set_current_state', false)
    }
  }
}
</script>
