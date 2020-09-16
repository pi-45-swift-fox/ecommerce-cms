<template lang="html">
  <div class="dashboard vh-100">
    <h1>I think you're lost...</h1>
    <router-link to="/">click here to go back</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
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
