<template>
  <div class="offcanvas offcanvas-end  bg-secondary" style="width: 450px" ref="cartOffcanvas"
  tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header border-bottom border-primary">
      <h5 class="text-primary" >購物車</h5>
      <!-- id="offcanvasRightLabel" -->
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      <!--  -->
    </div>
    <template v-if="cartData.carts.length">
      <div class="offcanvas-body">
      <div class="card mb-3" v-for="cartItem in cartData.carts" :key="cartItem.id">
        <div class="row g-0">
          <div class="col-3">
            <img class="card-img img-fluid rounded-start" alt="cartItem.product.title"
            :src="cartItem.product.imageUrl">
          </div>
          <div class="col-6 text-dark">
            <div class="card-body d-flex flex-column justify-content-between h-100 py-0">
              <h5 class="card-title text-primary fw-medium m-0">{{ cartItem.product.title }}</h5>
              <p class="card-text">NT$ {{ cartItem.product.price }}</p>
              <button type="button" class="btn border-0 text-start w-25 p-0" :disabled="isSpinner"
              @click="deleteItemCart(cartItem.id)">
                <span class="material-icons-outlined text-light align-bottom">delete_outline</span>
              </button>
            </div>
          </div>
          <div class="col-3 align-self-center">
            <input type="number" min="1" class="form-control border-1 border-light rounded-2 text-center" :readonly="isSpinner"
            v-model="cartItem.qty" @change="updateCart(cartItem)">
          </div>
        </div>
      </div>
    </div>
    <div class="position-absolute bottom-0 position-sticky bg-secondary border-top border-primary p-3">
        <div class="d-flex justify-content-between mb-4">
          <button type="button" class="btn btn-sm btn-outline-light px-2" :disabled="isSpinner"
            @click="deleteCarts">
            <div v-if="isSpinner === true" class="spinner-border spinner-border-sm me-2" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            清空全部購物車
          </button>
          <p v-if="total === final_total" class="text-end">總金額：NT$ {{ total }} 元</p>
          <div v-else class="text-end">
            <del class="fs-2 text-light">總金額：NT$ {{ total }} 元</del>
            <p>折價後金額：NT$ {{ final_total }} 元</p>
          </div>
        </div>
        <router-link to="/order" class="btn btn-primary w-100" @click="closeOffcanvas">確認結帳</router-link>
    </div>
    </template>

    <!-- 購物車沒有商品 -->
    <div v-else class="offcanvas-body text-light text-center p-6">
      <span class="material-icons-outlined fs-6">fmd_bad</span>
      <p class="fs-4 mb-4">購物車內沒有商品</p>
      <router-link to="/products" class="btn btn-primary px-5" @click="closeOffcanvas">前往選購</router-link>
    </div>
  </div>
</template>

<script>
// import Offcanvas from 'bootstrap/js/dist/offcanvas'
import { Offcanvas } from 'bootstrap'
// import offcanvasToggle from '@/mixins/offcanvasToggle.js'

export default {
  data () {
    return {
      cartData: {
        carts: []
      },
      cartOffcanvas: '',
      total: '',
      final_total: '',
      isSpinner: false
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
          this.final_total = res.data.data.final_total

          // 每當觸發 getCart 方法時，傳遞購物車數量到 FrontNavbar.vue (內傳外)
          this.$emit('cart-qty', this.cartData.carts.length)

          // 每當觸發 getCart 方法時，傳遞 this.carData 資料到 Order.vue
          this.$emitter.emit('get-cart-data', this.cartData)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    updateCart (cartItem) { // 要取的變數有多個，直接整包傳進來
      this.isSpinner = cartItem.id

      // 最少數量要為 1
      if (cartItem.qty <= 0) {
        cartItem.qty = 1
      }

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${cartItem.id}`
      const data = {
        product_id: cartItem.product_id,
        qty: cartItem.qty
      }
      this.$http.put(url, { data })
        .then((res) => {
          this.isSpinner = false

          this.getCart()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteCarts () {
      this.isSpinner = true

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/carts`
      this.$http
        .delete(url)
        .then((res) => {
          this.getCart()

          this.isSpinner = false
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    deleteItemCart (cartId) {
      this.isSpinner = cartId

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${cartId}`
      this.$http
        .delete(url)
        .then((res) => {
          this.getCart()

          this.isSpinner = false
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    closeOffcanvas () {
      this.cartOffcanvas.hide()
    }
  },
  mounted () {
    this.getCart()

    // 跨元件監聽加入購物車事件
    this.$emitter.on('get-cart', () => {
      this.getCart()
    })

    // 指向 DOM
    this.cartOffcanvas = new Offcanvas(this.$refs.cartOffcanvas)
  }
}
</script>
