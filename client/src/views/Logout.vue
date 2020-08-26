<template>
    <div>Logging you out</div>
</template>

<script>
export default {
  name: 'Logout',
  async created () {
    await this.$store.dispatch('logout')

    this.$router.push('/login')
  }
}
</script>

<style>

</style>
