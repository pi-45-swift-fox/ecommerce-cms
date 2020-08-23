<template>
    <div>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <router-link class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" to="/">Serba Ada Shop</router-link>
        <div class="input-group-append">
            <a class="nav-link text-white" href="#" @click.prevent="putar" v-if="isLogin === true">Putar Audio</a>
            <a class="nav-link text-white" href="#" @click="$bvModal.show('bv-modal-example')" v-if="isLogin === false">Login</a>
                <b-modal id="bv-modal-example" hide-footer>
                <template v-slot:modal-title>
                  Login Admin
                </template>
                <div class="d-block text-center">
                  <b-form @submit="onSubmit" v-if="show">
                      <b-form-group
                      id="input-group-1"
                      label="Email address:"
                      label-for="input-1"
                      description="We'll never share your email with anyone else."
                      >
                      <b-form-input
                          id="input-1"
                          v-model="form.email"
                          type="email"
                          required
                          placeholder="Enter email"
                      ></b-form-input>
                      </b-form-group>
                      <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
                      <b-form-input id="input-2" v-model="form.password" required placeholder="Enter password"></b-form-input>
                      </b-form-group>
                      <b-button type="submit" variant="primary">Submit</b-button>
                  </b-form>
                </div>
              </b-modal>
            <a class="nav-link text-white" href="#" v-if="isLogin === true" @click.prevent="signOut()">Sign out</a>
        </div>
    </nav>
</div>
</template>

<script>
import axios from 'axios'
import { Howl } from 'howler'

export default {
  name: 'Navbar',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true,
      isLogin: false
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios({
        method: 'POST',
        url: `${this.$store.state.baseUrl}/login`,
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
        .then((result) => {
          localStorage.setItem('access_token', result.data.access_token)
          console.log('berhasil', result)
          this.isLogin = true
          this.showAlertSuccess('Admin Successfully Logged In')
        }).catch((err) => {
          console.log('error', err)
          this.showAlertFail('You are not Admin')
        })
    },
    signOut () {
      localStorage.clear()
      this.isLogin = false
      this.showAlertSuccess('Successfully Logged Out')
      this.$store.state.product = {}
    },
    showAlertFail (message) {
      this.$swal({
        icon: 'error',
        title: 'Oops...',
        text: message
      })
    },
    showAlertSuccess (message) {
      this.$swal({
        icon: 'success',
        title: 'SUCCESS',
        text: message
      })
    },
    putar () {
      const audio = new Howl({
        src: ['KutetapMenanti(PopPunkCover).mp3'],
        html5: true,
        volume: 0.7,
        format: 'mp3',
        onend: function () {
          console.log('finished')
        }
      })
      audio.play()
    }
  },
  mounted () {
    if (localStorage.access_token) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
}
</script>

<style>

</style>
