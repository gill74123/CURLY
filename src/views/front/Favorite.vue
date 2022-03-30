<template>
  <!-- vue-loading-overlay -->
  <Loading v-model:active="isLoading"></Loading>

  <!-- banner -->
  <section class="favorite bg-banner position-relative">
    <h2
      class="
        position-absolute
        bg-light bg-opacity-25
        text-white text-center
        top-50
        start-50
        translate-middle
        p-3
        px-4
      "
    >
      <p>滿足你的味蕾，重拾你的好心情</p>
    </h2>
  </section>

  <div class="container py-6">
    <!-- 產品列表 -->
    <section class="mb-6">
      <div v-if="filterProducts.length !== 0" class="row">
        <div
          class="col-lg-3 col-sm-6"
          v-for="product in filterProducts"
          :key="product.id">
          <div class="card">
            <div class="card-img-box" @click.prevent="seeProduct(product.id)">
              <span
                v-if="product.origin_price !== product.price"
                class="card-tag"
                >On Sale</span
              >
              <a href="" class="img-hover-scale">
                <img :src="product.imageUrl" class="card-img" alt="" />
              </a>
            </div>
            <div class="card-body text-center">
              <div
                class="
                  card-title
                  d-flex
                  justify-content-center
                  align-items-center
                  text-primary
                "
              >
                <span
                  v-if="product.is_recommend"
                  class="material-icons-outlined me-2"
                  >recommend</span
                >
                <h5>{{ product.title }}</h5>
              </div>
              <p class="card-text mb-4">
                <span class="text-danger fs-4 fw-bold"
                  >$ {{ product.price }} 元</span
                >
                <del
                  v-if="product.origin_price !== product.price"
                  class="text-light ms-2"
                  >$ {{ product.origin_price }} 元</del
                >
              </p>
              <div class="btn-group d-flex justify-content-center">
                <!-- 收藏按鈕 -->
                <button class="btn btn-outline-danger px-1" :disabled="isSpinner"
                  @click="toggleFavorite(product.id)">
                  <span v-if="favorite.includes(product.id)" class="material-icons-outlined align-middle">favorite</span>
                  <span v-else class="material-icons-outlined align-middle">favorite_border</span>
                </button>
                <button
                  type="button" :disabled="isSpinner"
                  class="btn btn-primary px-5"
                  @click="addCart(product.id)"
                >
                  <div v-if="product.id === isSpinner" class="spinner-border spinner-border-sm me-2" role="status">
                      <span class="visually-hidden">Loading...</span>
                  </div>
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <h3 class="mb-3">還沒有收藏紀錄</h3>
        <h4 class="text-light mb-3">快將喜歡的好味道加入到我的最愛吧！</h4>
        <router-link to="/products" class="btn btn-primary px-5"
          >前往選購</router-link
        >
      </div>
    </section>

    <!-- 推薦商品 -->
    <section class="mb-6">
      <h3 class="text-center">推薦商品</h3>
      <div class="border text-center">放篩選過後的產品 (swiper)</div>
    </section>
  </div>
</template>

<script>
import localStorageFavorite from '@/mixins/localStorageFavorite.js'

export default {
  data () {
    return {
      products: [],
      filterProducts: [],
      isLoading: false,
      isSpinner: false
    }
  },
  mixins: [localStorageFavorite],
  methods: {
    getProducts () {
      this.isLoading = true

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products
          this.filterFavoriteProducts()

          this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    filterFavoriteProducts () {
      this.favorite.forEach((id) => {
        const filterArray = this.products.filter((item) => {
          return item.id === id
        })
        this.filterProducts.push(filterArray[0])
      })
    },
    addCart (productId, qty = 1) {
      this.isSpinner = productId
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`
      const data = {
        product_id: productId,
        qty: qty
      }
      this.$http
        .post(url, { data })
        .then((res) => {
          this.isSpinner = false

          // 跨元件去呼叫 getCart
          this.$emitter.emit('get-cart')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    seeProduct (productId) {
      this.$router.push(`/product/${productId}`)
    }
  },
  watch: {
    // 給 Favorite 頁面即時更新
    // 因 this.favorite 為陣列，所以要做深層的監聽
    // this.favorite 一有變動舊重新篩選
    favorite: {
      handler () {
        this.filterProducts = []
        this.filterFavoriteProducts()
      },
      deep: true
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
