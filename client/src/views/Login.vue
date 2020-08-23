<template>
    <div id="loginPage">
      <div id="loginForm">
        <i class="fa fa-cubes" aria-hidden="true"></i>
        <form class="mt-2" @submit.prevent="processLogin">
          <h4>Login Page</h4>
          <div class="form-group mt-4">
            <label for="email">Email address</label>
            <input v-model="email" type="email" class="form-control" id="email" placeholder="email@example.com">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <div class="form-group form-check">
            <input @click="togglePassword('password')" type="checkbox" class="form-check-input">
            <label class="form-check-label">Show Password</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
</template>

<script>
import Axios from 'axios'
import Swall from 'sweetalert'
import swal from 'sweetalert'

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    togglePassword (id) {
      const x = document.getElementById(id);
      if (x.type === 'password') {
        x.type = 'text';
      } else {
        x.type = 'password';
      }
    },
    processLogin () {
      Axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email: this.email,
          password: this.password
        },
      })
      .then((user) => {
        localStorage.setItem('access_token', user.data.access_token);
        this.$router.push({ name: 'ProductTable' });
      })
      .catch((err) => {
        const error = err.response.data.message;
        swal('Error', `${error}`, 'error');
      });
    }
  },

}
</script>

<style>

</style>