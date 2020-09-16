<template>
  <div class="home vh-100">
    <b-container fluid>
      <b-row class="vh-100">
        <b-col class="left-side">
          <b-container fluid="xs" class="w-75">
            <p>Manage, your e-commerce business with ease by using our services.</p>
            <b-button @click="loginForm" class="button" style="font-family: 'Alata', sans-serif;" size="lg" type="button" name="button">Log in here</b-button>
          </b-container>
        </b-col>
        <b-col cols="5" class="bg-image">
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  methods: {
    loginForm () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
.home {
  background-color: #FBF7ED;
  font-family: 'Poppins', sans-serif;
}

p {
  font-size: 3em;
  font-weight: bold;
  color: #004C3F;
}

.bg-image {
  background-image: url("https://images.pexels.com/photos/165228/pexels-photo-165228.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  background-repeat: repeat;
  background-position: 50% 50%;
}

.left-side {
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.button {
  background-color: #107C4F;
}

.button:hover {
  background-color: #004C3F;
}

@media (max-width: 768px) {
  p {
    font-size: 4vw;
  }

  .bg-image {
    background-color: #FBF7ED;
  }
}
</style>
