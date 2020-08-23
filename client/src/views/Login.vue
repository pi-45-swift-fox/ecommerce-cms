<template>
  <div>
    <div>
    <b-card overlay img-src="https://wallpapercrafter.com/desktop/207136-clothes-and-accessories-in-an-apparel-storetrendy-.jpg"></b-card>
    </div>
      <div class="form px-5 py-5">
        <div class="mt-auto my-5">
        Welcome to Xstore
        </div>
          <b-form @submit="onSubmit">
            <b-form-group label="Email address:"
              description="We'll never share your email with anyone else.">
              <div class="email">
                <b-form-input v-model="form.email" type="email" required placeholder="Enter email">
                </b-form-input>
              </div>
            </b-form-group>
            <b-form-group label="Password">
              <div class="password">
                <b-form-input type='password' v-model="form.password" required placeholder="Enter Password"></b-form-input>
              </div>
            </b-form-group>
            <b-button class="py-3 px-3 mt-5" type="submit" variant="primary">Submit</b-button>
          </b-form>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios({
        url: 'http://localhost:3000/login',
        method: 'post',
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.token = data.token
          this.email = ''
          this.password = ''
          router.push('/products')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
*{
  margin: 0px !important;
  padding: 0px !important;
  box-sizing: border-box;
}
.form{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 20px;
}

</style>
// https://wallpapercrafter.com/desktop/207136-clothes-and-accessories-in-an-apparel-storetrendy-.jpg
