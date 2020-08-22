<template>
  <div>
    <b-card
        :title="product.name"
        :img-src="product.image_url"
        img-alt="Image"
        img-top
        tag="article"
        style="width: 20rem;"
        class="mb-2 mx-3 bg-color"
    >
        <b-card-text>
          Price : Rp.{{ product.price.toLocaleString() }}
          <br>
          Stock : {{ product.stock }} pcs
        </b-card-text>

        <b-button id="editBtn" @click.prevent="editProduct" >Edit</b-button>
        <b-button id="delBtn" @click.prevent="deleteProduct">Delete</b-button>
    </b-card>
  </div>
</template>

<script>
import swal from 'sweetalert'
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    editProduct () {
      swal({
        title: `Edit product, name ${this.product.name}?`,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willEdit) => {
          if (willEdit) {
            this.$store.commit('SET_PRODUCT', this.product)
            this.$store.dispatch('getProduct', this.product.id)
            this.$router.push({ path: `/products/${this.product.id}` })
          } else {
            swal(`Cancelled to edit product, name ${this.product.name}.`)
          }
        })
    },
    deleteProduct () {
      swal({
        title: `Are you sure want to delete ${this.product.name}?`,
        text: 'Once deleted, you will not be able to recover this product!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.$store.dispatch('deleteProduct', this.product.id)
            swal('Poof! Your product has been deleted!', {
              icon: 'success'
            })
          } else {
            swal(`Cancelled to delete product ${this.product.name}.`)
          }
        })
    }
  }
}
</script>

<style scoped>

  * {
    color: #143109;
  }
  img {
    max-height: 20rem;
    min-height: 20rem;
    width: auto;
  }

  .bg-color {
    background-color: #8DA290;
    transition: transform .2s; /* Animation */
  }

  .bg-color:hover {
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
    box-shadow: -1px 3px 18px 4px rgba(255,255,255,1);
    transform: rotate(2deg);
    transform: scale(1.1);
  }

  #editBtn {
    background-color: #4F9EC4;
    color: #C6DDF0;
    font-size: larger;
    padding: 5px;
    width: 80px;
    margin-right: 10px;
  }

  #editBtn:hover {
    /* background-color: #02075d; */
    background-color: #C6DDF0;
    color: #4F9EC4;
    font-size: larger;
  }

  #delBtn {
    background-color: #F24333;
    color: #F2D398;
    font-size: larger;
    padding: 5px;
    width: 80px;
  }

  #delBtn:hover {
    background-color: #F2D398;
    color: #F24333;
    font-size: larger;
  }
</style>
