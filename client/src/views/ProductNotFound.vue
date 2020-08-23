<template lang="html">
  <div class="dashboard vh-100">
    <h1>Product is not there with that id....</h1>
    <router-link to="/products">click here to go back to your dashboard</router-link>
  </div>
</template>

<script>
export default {
  name: 'ProductNotFound'
}
</script>

<style lang="css" scoped>
.dashboard {
  background-color: #FBF7ED;
  font-family: 'Alata', sans-serif;
  color: #002E25;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
