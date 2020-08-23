<template>
    <div>
        <h2>List Of Banner</h2>
        <div class="info">
          <table class="table">
              <thead class="thead-dark">
                  <tr class="text-center">
                      <th scope="col">No.</th>
                      <th scope="col">Campaign's Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Status</th>
                      <th scope="col">Display</th>
                      <th scope="col">Option</th>
                  </tr>
              </thead>
              <tbody class="table-bordered">
                <TableDataBanner v-for="(banner, index) in $store.state.banners"
                :key="banner.id" :index="index" :banner="banner">
            </TableDataBanner>
              </tbody>
          </table>
        </div>
    </div>
</template>

<script>
import TableDataBanner from '../components/TableDataBanner';

export default {
  name:"BannerTable",
  components: {
    TableDataBanner,
  },
  created() {
    this.$store.dispatch('showBanners');
  }
}
</script>

<style>
h2 {
  background: none;
  color: aliceblue;
  margin: 10px 20px;
  font-weight: bold;
  text-decoration: underline;
  text-align: center;
}
</style>