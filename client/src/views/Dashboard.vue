<template>
    <div class="wrapper">
        <div class="sidebar">
            <div class="user">
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
              <h5>Welcome, Admin</h5>
            </div>
            <ul>
                <li>
                  <router-link >
                    <i class="fa fa-list" aria-hidden="true"></i>Product
                  </router-link>
                </li>
                <li>
                  <router-link >
                    <i class="fa fa-list" aria-hidden="true"></i>Banner
                  </router-link>
                </li>
                <li>
                    <a href="#"><i class="fa fa-plus" aria-hidden="true"></i>Add</a>
                    <ul>
                      <li class="underLi">
                        <a role="button">
                          <i class="fa fa-plus" aria-hidden="true"></i>Product
                        </a>
                      </li>
                      <li class="underLi">
                        <a role="button">
                          <i class="fa fa-plus" aria-hidden="true"></i>Banner
                        </a>
                      </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- main content START -->
        <div class="main_content">
            <div class="header">
              <h1>E-Store CMS</h1>
              <a role="button">
                <i class="fa fa-sign-out" aria-hidden="true"></i>Logout
              </a>
            </div>
            <!-- isi dari page yang mau diubah -->
            <router-view></router-view>
          <!-- isi dari page yang mau diubah -->
        </div>
    </div>
</template>

<script>
export default {
  name: "Dashboard"

}
</script>

<style>

</style>