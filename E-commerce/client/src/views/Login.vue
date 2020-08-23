<template>
   <div>
    <b-form @submit.prevent="loginUser" @reset.prevent="reset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          type="email"
          required
          placeholder="Enter email"
          v-model="email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your passwordd:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          required
          placeholder="password"
          v-model="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginUser () {
      this.$store.dispatch('Login', { email: this.email, password: this.password })
      this.reset()
    //   axios({
    //     url: 'http://localhost:3000/login',
    //     method: 'POST',
    //     data: {
    //       email: this.email,
    //       password: this.password
    //     }
    //   })
    //     .then(data => {
    //       console.log(data.data)
    //       this.$store.dispatch('setLocalStorage', { email: this.email, password: this.password })
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    },
    reset () {
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>

</style>
