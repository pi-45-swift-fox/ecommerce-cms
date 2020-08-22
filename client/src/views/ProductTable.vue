<template>
    <div>
        <h2>List Of Product</h2>
        <div class="info">
          <table class="table">
              <thead class="thead-dark">
                  <tr class="text-center">
                      <th scope="col">No.</th>
                      <th scope="col">Product's Name</th>
                      <th scope="col">Display</th>
                      <th scope="col">Price</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Category</th>
                      <th scope="col">Option</th>
                  </tr>
              </thead>
              <tbody class="table-bordered">

              </tbody>
          </table>
        </div>
    </div>
</template>

<script>
export default {
  name:"ProductTable"

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