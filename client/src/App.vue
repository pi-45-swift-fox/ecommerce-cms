<template>
  <div id="app" style="background-color: #484d5c;">
    <div id="nav" v-if="$store.state.isLogin === false">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
    </div>
    <div v-else-if="$store.state.isLogin === true">
      <NavBar></NavBar>
    </div>
      <router-view/>
  </div>
</template>

<script>
import NavBar from './components/Navbar'

export default {
  name: 'App',
  components: {
    NavBar
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('SET_ISLOGIN', true)
    } else {
      this.$store.commit('SET_ISLOGIN', false)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');

* {
  font-family: 'Quicksand', sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #8DA290;
  text-decoration: none;
  background-image: linear-gradient(rgb(141, 162, 144), rgb(141, 162, 144)),
    linear-gradient(#FCF1D8, #FCF1D8);
  background-size: 100% 2px, 0 2px;
  background-position: 100% 100%, 0 100%;
  background-repeat: no-repeat;
  transition: background-size 2s linear;
}

#nav a.router-link-exact-active:hover {
    background-size: 0 2px, 100% 2px;
    color: #FCF1D8;
}
</style>
