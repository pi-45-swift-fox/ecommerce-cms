<template>
  <div>
      <h3>Are you sure?</h3>
      <div>
        <b-button type="submit" variant="primary">Yes</b-button>
        <b-button type="reset" variant="danger">No</b-button>
      </div>
  </div>

</template>

<script>
export default {
  methods: {
    yes () {
      this.$store.dispatch('deleteProduct', this.product.id)
    },
    no () {
      this.$store.dispatch('readProducts', {})
    }
  }

}
</script>

<style>

</style>
