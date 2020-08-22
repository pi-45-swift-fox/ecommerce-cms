<template lang="html">
  <div class="nav shadow">
  <!-- As a heading -->
    <b-navbar variant="faded" type="light" class="navbar">
      <b-navbar-brand tag="h1" class="mb-1" style="color: #FBF7ED;">Hello, Seller</b-navbar-brand>
      <b-button @click="logout" size="md" class="my-2 my-sm-0 button" type="submit" variant="success">Log out</b-button>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css" scoped>
.nav {
  background-color: #004C3F;
  color: #FBF7ED;
  margin-bottom: 50px;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.button {
  background-color: #FBF7ED;
  color: #004C3F;
}

.button:hover {
  background-color: #DBD7CD;
}
</style>
