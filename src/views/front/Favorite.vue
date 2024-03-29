<template>
  <!-- Loading -->
  <Loading v-model:active="isLoading" />

  <section class="favorite bg-banner position-relative">
    <h2
      class="
        position-absolute
        bg-light bg-opacity-25
        text-white text-center
        top-50
        start-50
        translate-middle
        w-75
        w-lg-50
        p-3 py-4" data-aos="fade-up" data-aos-offset="0"
    >
      <p>快把「收藏」帶回家，重拾你的好心情</p>
    </h2>
  </section>

  <div class="favorite container">
    <section class="py-6 py-md-7">
      <div v-if="favoriteProducts.length !== 0" class="row">
        <div
          class="col-lg-3 col-sm-6"
          v-for="product in favoriteProducts"
          :key="product.id">
          <div class="card">
            <a href="#" class="stretched-link" @click.prevent="seeProduct(product.id)">
              <div class="card-img-box">
                <span
                  v-if="product.origin_price !== product.price"
                  class="card-tag"
                  >On Sale</span>
                  <img class="card-img" :src="product.imageUrl" :alt="product.title">
              </div>
            </a>
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
                  >recommend</span>
                <h5>{{ product.title }}</h5>
              </div>
              <p class="card-text mb-4">
                <span class="text-danger fs-4 fw-bold">$ {{ product.price }} 元</span>
                <del
                  v-if="product.origin_price !== product.price"
                  class="text-light ms-2"
                  >$ {{ product.origin_price }} 元
                </del>
              </p>
              <div class="btn-group d-flex justify-content-center">
                <button type="button" class="btn btn-outline-danger py-2 px-1 z-20" :disabled="isSpinner"
                  @click="toggleFavorite(product.id)">
                  <span v-if="favorite.includes(product.id)" class="material-icons-outlined align-middle">favorite</span>
                  <span v-else class="material-icons-outlined align-middle">favorite_border</span>
                </button>
                <button
                  type="button" :disabled="isSpinner"
                  class="btn btn-primary py-2 px-5 z-20"
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
        <RouterLink to="/products" class="btn btn-primary px-5 py-2">前往選購</RouterLink >
      </div>
    </section>

    <section class="py-6 py-md-7">
      <div class="d-flex justify-content-center align-items-center mb-5 mb-md-6">
        <div class="d-none d-md-block bg-primary" style="width: 100px; height: 2px"></div>
        <h3 class="d-none d-md-block text-primary mx-4">捲捲 店長推薦</h3>
        <h3 class="d-md-none text-primary border-bottom border-primary border-2 px-2 pb-2">捲捲 店長推薦</h3>
        <div class="d-none d-md-block bg-primary" style="width: 100px; height: 2px"></div>
      </div>
      <!-- Swiper -->
      <Swiper :filter-products="recommendProducts" data-aos="zoom-in-left" />
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
          this.isSpinner = false
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
