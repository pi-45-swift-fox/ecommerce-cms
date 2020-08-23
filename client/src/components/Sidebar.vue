<template>
    <div class="container-fluid">
      <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <img src="../assets/serbada.png" class="mt-0" alt="serbaada" style="height:70px">
          <div class="sidebar-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/about">About</router-link>
              </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Customized Category</span>
              <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link class="nav-link" to="/fashion">Fashion</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/books">Books</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/electronics">Electronics</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/otomotif">Otomotif</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/foods">Foods</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/drinks">Drinks</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/furniture">Furniture</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/others">Others</router-link>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view/>
        </main>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style>

</style>
