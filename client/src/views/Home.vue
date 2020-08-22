<template>
  <div class="home">
    <Add v-if="openAddpage" />
    <Edit v-if="openEditpage" />
    <div v-if="!log">
     <Login />
    </div>
    <div v-if="log" id="container">
      <div id="navs">
        <Navbar />
      </div>
      <br><br><br><br><br>
      <div id="content">
        <h1>List of Games</h1>
        <Content />
      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue';
import Navbar from '../components/Navbar.vue';
import Content from '../components/Content.vue';
import Add from '../components/Add.vue';
import Edit from '../components/Edit.vue';

export default {
  name: 'Home',
  components: {
    Content,
    Login,
    Navbar,
    Add,
    Edit,
  },
  computed: {
    log() {
      return this.$store.state.logged;
    },
    openAddpage () {
      return this.$store.state.openAdd;
    },
    openEditpage () {
      return this.$store.state.openEdit;
    },
  },
  created() {
    if (localStorage.access_token) {
      this.$store.dispatch('Logged');
    }
  },
};
</script>

<style scoped>
.home{
  width: 100%;
  background-image: url("https://i.pinimg.com/originals/d5/b0/1e/d5b01e59674b1dfc9ed4a59427ee13e7.jpg");
  background-size: cover;
  height: 100%;
}
#content {
  width: 90%;
  background-color: lightblue;
  margin: auto;
  overflow: auto;
}
.navigation{
  height: 150px;
}
/* #navs {
  
} */
h1 {
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
 font-weight: bold;
 font-style: oblique;
}
</style>
