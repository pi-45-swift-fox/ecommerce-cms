<template>
  <div class="row mx-auto">
    <div class="col-md-5 mx-auto">
      <div id="first">
        <div class="myform form">
          <div class="logo mb-3">
            <div class="col-md-12 text-center">
              <h1 class="text">Login</h1>
            </div>
          </div>
          <form action method="post" name="login" @submit.prevent="submit">
            <div class="form-group">
              <label for="exampleInputEmail1" class="text">Email address</label>
              <input
                type="email"
                name="email"
                class="form-control"
                v-model="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="text">Password</label>
              <input
                type="password"
                name="password"
                v-model="password"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Password"
              />
            </div>
            <br />
            <div class="col-md-12 text-center">
              <input type="submit" class="btn btn-block mybtn btn-primary tx-tfm" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  computed: {
    stateOfLogin: {
      get () {
        return this.$store.state.login
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.stateOfLogin) next({ path: from.path })
      else next()
    })
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    /* Terima kasih async */ async submit () {
      /* Terima kasih await */ await this.$store.dispatch('login', { email: this.email, password: this.password })
      // console.log(this.stateOfLogin)
      // Belum rapih, store tidak bisa push route Bertemu lagi dengan sahabat lama, async await bisa di vue cli - create, kalau seperti ini, bisa emit store if fail dan success (toast swal ((toast untuk kawan async await)))
      if (this.stateOfLogin) {
        this.$router.push('/')
      } else {
      }
    }
  }
}
</script>
