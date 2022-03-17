<template>
  <div class="offcanvas offcanvas-end  bg-secondary" style="width: 450px" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header border-bottom border-primary">
      <h5 class="text-primary" id="offcanvasRightLabel">購物車</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body" v-if="cartData.carts.length">
      <div class="card mb-3" v-for="cartItem in cartData.carts" :key="cartItem.id">
        <div class="row g-0">
          <div class="col-3">
            <img class="card-img img-fluid rounded-start" alt="cartItem.product.title"
            :src="cartItem.product.imageUrl">
          </div>
          <div class="col-6 text-dark">
            <div class="card-body d-flex flex-column justify-content-between h-100 py-0">
              <h5 class="card-title text-primary fw-medium m-0">{{ cartItem.product.title }}</h5>
              <p class="card-text ">$ {{ cartItem.product.price }}</p>
              <button type="button" class="btn border-0 text-start w-25 p-0" @click="deleteItemCart(cartItem.id)">
                <span class="material-icons-outlined text-light align-bottom">delete_outline</span>
              </button>
            </div>
          </div>
          <div class="col-3 align-self-center">
            <input type="number" min="1" class="form-control bg-secondary border-1 border-light rounded-2 text-light text-center"
            v-model="cartItem.qty" @change="updateCart(cartItem)">
          </div>
        </div>
      </div>
      <hr>
      <div class="d-flex justify-content-between mb-6">
        <button type="button" class="btn btn-sm btn-outline-light px-2" @click="deleteCarts">清空全部購物車</button>
        <p class="text-end">總金額：$ {{ total }} 元</p>
      </div>
      <button type="button" class="btn btn-primary text-white w-100">確認結帳</button>
    </div>
    <div v-else class="offcanvas-body text-light text-center p-6">
      <span class="material-icons-outlined fs-6">fmd_bad</span>
      <p class="fs-4 mb-4">購物車內沒有商品</p>
      <router-link to="/products" class="btn btn-primary text-white px-5">前往購物</router-link>
    </div>
  </div>
</template>

<script>
// import Offcanvas from 'bootstrap/js/dist/offcanvas'

export default {
  data () {
    return {
      cartData: {
        carts: []
      },
      cartOffcanvas: '',
      total: ''
    }
  },
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .get(url)
        .then((res) => {
          this.cartData = res.data.data
          this.total = res.data.data.total

          // 每當觸發 getCart 方法時，傳遞購物車數量到 FrontNavbar.vue
          this.$emit('cart-qty', this.cartData.carts.length)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    updateCart (cartItem) { // 要取的變數有多個，直接整包傳進來
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${cartItem.id}`
      const data = {
        product_id: cartItem.product_id,
        qty: cartItem.qty
      }
      this.$http.put(url, { data })
        .then((res) => {
          // this.spinnerOn = ''

          this.getCart()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteCarts () {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/carts`
      this.$http
        .delete(url)
        .then((res) => {
          this.getCart()
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    deleteItemCart (cartId) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${cartId}`
      this.$http
        .delete(url)
        .then((res) => {
          console.log(res)
          this.getCart()
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  },
  mounted () {
    this.getCart()

    // 監聽加入購物車事件
    this.$emitter.on('get-cart', () => {
      this.getCart()
    })

    // this.cartOffcanvas = new Offcanvas(this.$refs.cartOffcanvas, { backdrop: true })
  }
}
</script>
