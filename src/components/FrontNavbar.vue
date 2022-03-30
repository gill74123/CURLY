<template>
  <nav class="navbar navbar-expand-lg navbar-light sticky-top top-0 border-bottom">
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
            <router-link to="/about" class="nav-link text-center mx-2">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link text-center mx-2">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/articles" class="nav-link text-center mx-2">最新消息</router-link>
          </li>
        </ul>
      </div>

      <div class="order-2 order-lg-3">
        <!-- 收藏按鈕 -->
        <router-link to="/favorite" class="btn position-relative">
          <span class="material-icons-outlined align-middle text-primary fs-5">favorite</span>
          <span v-if="favoriteQty" class="position-absolute top-40 start-50 badge rounded-pill bg-danger text-white">{{ favoriteQty }}</span>
        </router-link >
        <!-- 購物車按鈕 -->
        <button class="btn position-relative border-0 p-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <span class="material-icons-outlined text-primary fs-5 py-2">shopping_bag</span>
          <span v-if="cartQty" class="position-absolute top-40 start-50 badge rounded-pill bg-danger text-white">{{ cartQty }}</span>
        </button>
      </div>
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
      cartQty: '',
      favoriteQty: ''
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
  },
  mounted () {
    // 初始化先取得 localStorage 的數量
    if (JSON.parse(localStorage.getItem('favorite'))) {
      this.favoriteQty = JSON.parse(localStorage.getItem('favorite')).length
    } else {
      this.favoriteQty = 0
    }

    // 跨元件監聽收藏事件
    this.$emitter.on('toggle-favorite', (favoriteData) => {
      this.favoriteQty = favoriteData.length
    })
  }
}
</script>
