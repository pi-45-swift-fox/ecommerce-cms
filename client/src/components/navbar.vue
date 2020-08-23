<template>
  <div class="navbar sticky-top mt-3 bg-darkGrey">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/addProduct">Add Product</router-link>
    </div>
    <b-button class=" noOpacity" variant="danger" @click="logout">Logout</b-button>
  </div>
</template>

<script>
import swal from 'sweetalert'
export default {
  name: 'Navbar',
  methods: {
    logout () {
      swal({
        title: 'Are you sure?',
        text: 'Please stay a little longer!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            localStorage.clear()
            this.$router.push({ name: 'Login' })
          }
        })
    }
  }
}
</script>

<style>

.bg-darkGrey {
  background-color: #333;
  opacity: 90%;
}

#nav a {
  font-weight: bold;
  color: #128043;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
