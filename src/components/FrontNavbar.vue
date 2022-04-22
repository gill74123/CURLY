<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top top-0 border-bottom">
    <div class="container justify-content-end align-items-center">
      <RouterLink to="/" class="navbar-brand order-1 me-auto pe-4">
        <h1 class="d-flex  align-items-center text-primary">
          <p class="img-logo me-2">Logo</p>
          <p class="text-logo fs-4 fw-medium">CURLY</p>
        </h1>
      </RouterLink>
      <button class="navbar-toggler order-3 order-lg-2 py-0"
        type="button" @click="toggleCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse order-3 order-lg-2" ref="collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link text-center py-3 py-md-2 mx-2" @click="closeCollapse">關於我們</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/products" class="nav-link text-center py-3 py-md-2 mx-2" @click="closeCollapse">產品列表</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/articles" class="nav-link text-center py-3 py-md-2 mx-2" @click="closeCollapse">最新消息</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/orderTrack" class="nav-link text-center py-3 py-md-2 mx-2" @click="closeCollapse">訂單查詢</RouterLink>
          </li>
        </ul>
      </div>

      <div class="order-2 order-lg-3">
        <RouterLink to="/favorite" class="btn position-relative p-0">
          <span class="material-icons-outlined text-primary fs-5 py-2 me-3">favorite</span>
          <span v-if="favoriteQty" class="position-absolute start-50 badge rounded-pill bg-danger text-white">
            {{ favoriteQty }}
          </span>
        </RouterLink>

        <button class="btn position-relative border-0 p-0 mx-3" type="button" @click="openModal">
          <span class="material-icons-outlined text-primary fs-5 py-2">shopping_bag</span>
          <span v-if="cartQty" class="position-absolute start-50 badge rounded-pill bg-danger text-white">
            {{ cartQty }}
          </span>
        </button>
      </div>
    </div>
  </nav>

  <!-- FrontCartModal -->
  <FrontCartModal ref="cartOffcanvas" />
</template>

<script>
import FrontCartModal from '@/components/FrontCartModal.vue'
import collapseToggle from '@/mixins/collapseToggle.js'

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
  mixins: [collapseToggle],
  methods: {
    openModal () {
      this.$refs.cartOffcanvas.showOffcanvas()
    }
  },
  mounted () {
    // 取得 localStorage 的數量
    if (JSON.parse(localStorage.getItem('favorite'))) {
      this.favoriteQty = JSON.parse(localStorage.getItem('favorite')).length
    } else {
      this.favoriteQty = 0
    }

    // 跨元件監聽收藏事件
    this.$emitter.on('toggle-favorite', (favoriteData) => {
      this.favoriteQty = favoriteData.length
    })

    // 跨元件監聽購物車數量事件
    this.$emitter.on('cart-qty', (qty) => {
      this.cartQty = qty
    })
  }
}
</script>
