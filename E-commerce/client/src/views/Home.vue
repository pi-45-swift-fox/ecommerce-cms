<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from './Login.vue'

export default {
  name: 'Home',
  components: {
    Login
  },
  methods: {
  },
  created () {
  }
}
</script>
