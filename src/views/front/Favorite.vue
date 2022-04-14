<template>
  <!-- Loading -->
  <Loading v-model:active="isLoading"></Loading>

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
        px-4"
    >
      <p>滿足你的味蕾，重拾你的好心情</p>
    </h2>
  </section>

  <div class="container py-6">
    <section class="mb-6 py-3">
      <div v-if="favoriteProducts.length !== 0" class="row">
        <div
          class="col-lg-3 col-sm-6"
          v-for="product in favoriteProducts"
          :key="product.id">
          <div class="card">
            <div class="card-img-box" @click.prevent="seeProduct(product.id)">
              <span
                v-if="product.origin_price !== product.price"
                class="card-tag"
                >On Sale</span
              >
              <a href="#" class="img-hover-scale">
                <img :src="product.imageUrl" class="card-img" :alt="product.title" />
              </a>
            </div>
            <div class="card-body text-center">
              <div
                class="
                  card-title
                  d-flex
                  justify-content-center
                  align-items-center
                  text-primary"
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
                <button type="button" class="btn btn-outline-danger px-1" :disabled="isSpinner"
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

    <section class="mb-6 py-3">
      <div class="d-flex justify-content-center align-items-center mb-6">
        <div class="bg-primary" style="width: 100px; height: 2px"></div>
        <h3 class="text-primary mx-4">捲捲 店長推薦</h3>
        <div class="bg-primary" style="width: 100px; height: 2px"></div>
      </div>
      <!-- Swiper -->
      <Swiper :filter-products='recommendProducts'></Swiper>
    </section>
  </div>
</template>

<script>
import localStorageFavorite from '@/mixins/localStorageFavorite.js'
import Swiper from '@/components/Swiper.vue'

export default {
  data () {
    return {
      products: [],
      favoriteProducts: [],
      recommendProducts: [],
      isLoading: false,
      isSpinner: false
    }
  },
  components: {
    Swiper
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
          this.filterRecommendProducts()

          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    filterFavoriteProducts () {
      this.favorite.forEach((id) => {
        const filterArray = this.products.filter((item) => {
          return item.id === id
        })
        this.favoriteProducts.push(filterArray[0])
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
          this.$httpMessageState(res, '加入購物車')

          // 跨元件去呼叫 getCart
          this.$emitter.emit('get-cart')
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '加入購物車')
        })
    },
    seeProduct (productId) {
      this.$router.push(`/product/${productId}`)
    },
    filterRecommendProducts () {
      this.recommendProducts = this.products.filter(item => item.is_recommend === 1)
    }
  },
  watch: {
    // this.favorite 一有變動就重新篩選
    // 因 this.favorite 為陣列，所以要做深層的監聽
    favorite: {
      handler () {
        this.favoriteProducts = []
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
