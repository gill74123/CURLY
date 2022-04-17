<template>
  <div class="offcanvas offcanvas-end  bg-secondary" style="width: 450px" ref="cartOffcanvas"
  tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header border-bottom border-primary">
      <h5 class="text-primary" >購物車</h5>
      <button type="button" class="btn-close text-reset" @click="closeOffcanvas"></button>
    </div>
    <template v-if="cartData.carts.length">
      <div class="offcanvas-body">
      <div class="card mb-3" v-for="cartItem in cartData.carts" :key="cartItem.id">
        <div class="row g-0">
          <div class="col-3">
            <img class="card-img img-fluid rounded-start"
            :src="cartItem.product.imageUrl" :alt="cartItem.product.title">
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
            @click="openModal('cartAllDelete')">
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

    <div v-else class="offcanvas-body text-light text-center p-6">
      <span class="material-icons-outlined fs-6">fmd_bad</span>
      <p class="fs-4 mb-4">購物車內沒有商品</p>
      <router-link to="/products" class="btn btn-primary px-5" @click="closeOffcanvas">前往選購</router-link>
    </div>
  </div>

  <!-- AdminDelModal -->
  <AdminDelModal ref="delModal" :del-modal-status="delModalStatus"
    @get-carts="getCart"></AdminDelModal>
</template>

<script>
import offcanvasToggle from '@/mixins/offcanvasToggle'
import AdminDelModal from '@/components/AdminDelModal.vue'

export default {
  data () {
    return {
      cartData: {
        carts: []
      },
      total: '',
      final_total: '',
      delModalStatus: '',
      isSpinner: false
    }
  },
  components: {
    AdminDelModal
  },
  mixins: [offcanvasToggle],
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .get(url)
        .then((res) => {
          this.cartData = res.data.data
          this.total = res.data.data.total
          this.final_total = res.data.data.final_total

          this.$emitter.emit('cart-qty', this.cartData.carts.length)

          // 跨元件傳遞 this.carData 資料到 Order.vue
          this.$emitter.emit('get-cart-data', this.cartData)
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    updateCart (cartItem) {
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
          this.$httpMessageState(res, '更新購物車')

          this.getCart()
        })
        .catch((err) => {
          this.$httpMessageState('errMessage', err.response.data.message)
        })
    },
    openModal (modalStatus) {
      this.delModalStatus = modalStatus
      this.$refs.delModal.openModal()
    },
    deleteItemCart (cartId) {
      this.isSpinner = cartId

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${cartId}`
      this.$http
        .delete(url)
        .then((res) => {
          this.isSpinner = false
          this.$httpMessageState(res, '刪除購物車產品')

          this.getCart()
        })
        .catch((err) => {
          this.$httpMessageState('errMessage', err.response.data.message)
        })
    }
  },
  mounted () {
    this.getCart()

    // 跨元件監聽加入購物車事件
    this.$emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>
