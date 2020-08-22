<template>
    <div id="loginPage">
      <div id="loginForm">
        <i class="fa fa-cubes" aria-hidden="true"></i>
        <form class="mt-2">
          <h4>Login Page</h4>
          <div class="form-group mt-4">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="email@example.com">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input">
            <label class="form-check-label">Show Password</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  name: "Login"

}
</script>

<style>

</style>