<template>
  <nav class="navbar navbar-expand-lg navbar-light sticky-top border-bottom">
    <div class="container justify-content-end">
      <router-link to="/" class="navbar-brand order-1 me-auto">CURLY</router-link>
      <button
        class="navbar-toggler order-3 order-lg-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse order-3 order-lg-2" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/products" class="nav-link text-center mx-2">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link text-center mx-2">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/articles" class="nav-link text-center mx-2">最新消息</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link to="/carts" class="nav-link text-center">購物車</router-link>
          </li> -->
          <!-- <li class="nav-item">
            <router-link to="/order" class="nav-link text-center">確認訂單</router-link>
          </li> -->
          <!-- <li class="nav-item">
            <router-link to="/pay" class="nav-link text-center">結帳</router-link>
          </li> -->
          <!-- <li class="nav-item">
            <router-link to="/product" class="nav-link text-center">單一產品</router-link>
          </li> -->
        </ul>
      </div>

      <!-- 購物車按鈕 -->
      <button class="btn position-relative border-0 order-2 order-lg-3 p-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
        <span class="material-icons-outlined text-primary fs-5 py-2">shopping_bag</span>
        <span class="position-absolute top-40 start-50 badge rounded-pill bg-danger text-white">{{ cartQty }}</span>
      </button>
    </div>
  </nav>

  <!-- FrontCartModal -->
  <FrontCartModal @cart-qty="getCartQty"></FrontCartModal>
</template>

<script>
import FrontCartModal from '@/components/FrontCartModal.vue'

export default {
  data () {
    return {
      cartQty: ''
    }
  },
  components: {
    FrontCartModal
  },
  methods: {
    // 接收 FrontCartModal.vue 傳來的購物車數量
    getCartQty (qty) {
      this.cartQty = qty
    }
  }
}
</script>
