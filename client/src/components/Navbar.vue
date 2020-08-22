<template>
  <div class="navbar">
  <div class="title">
   <h2><a href="#" class="kanbanbtn" @click.prevent="home()">Minimals</a></h2>
  </div>
  <div class="nav-content">
   <a href="#" class="homebtn" @click.prevent="home()">Home</a>
   <a href="#" class="addbtn" @click.prevent="openAdd()">Add</a>
   <button class="btn btn-danger" @click.prevent="logout()">Logout</button>
  </div>
 </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'Navbar',
  computed: {
    logged() {
      return this.$store.logged;
    },
  },
  data() {
    return {
      isLogin: false,
    };
  },
  created() {
    if (localStorage.access_token) {
      this.isLogin = this.logged;
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LoggedOut');
      localStorage.clear();
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push({
          name: 'home',
        });
      }
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Logged Out successfully',
      });
    },
    openAdd() {
      this.$store.dispatch('openAddpage');
    },
  },
};
</script>

<style scoped>
.navbar{
 height: 50px;
 width: 100%;
 background-color: black;
 position: fixed;
 z-index : 2;
}

.navbar a{
 color: white;
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
 text-decoration: none;
}

.navbar .nav-content a {
 margin: 10px;
 font-weight: 400;
 font-size: 18px;
}
.title {
    margin-top: -0.5%;
}
.title a{
 font-family: 'Sofia', cursive;
}

.nav-content{
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
 font-size: 20px;
 margin-top: -0.5%;
 margin-left: 70%;
}

.kanbanbtn:hover,
.homebtn:hover,
.addbtn:hover{
 color: teal;
}

button{
  background: rgba(255, 0, 0, 0.5);
  border: rgb(255, 0, 0);
}
h2 {
  margin-left: -70%;
  margin-top: 10%;
}

</style>
