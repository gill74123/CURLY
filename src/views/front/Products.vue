<template>
  <!-- Loading -->
  <Loading v-model:active="isLoading" />

  <section class="products bg-banner position-relative">
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
      <p class="fs-4 fs-md-5 fw-bold">暖胃又暖心的好味道</p>
    </h2>
  </section>

  <section class="products container py-6 py-md-7">
    <div class="input-group w-100 w-md-50 w-lg-25 ms-auto mb-4">
      <input type="search" class="form-control border-primary p-2" placeholder="請輸入商品名稱"
        v-model.trim="this.searchValue">
      <button type="button" class="btn btn-primary px-5 px-lg-3" @click="searchProduct">搜尋</button>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <ul
          class="
            category
            list-unstyled
            d-flex
            flex-row flex-md-column
            justify-content-between
            scrollbar
            sticky-top"
        >
          <li>
            <a
              href="#"
              class="d-flex align-items-center border-bottom border-primary p-2 mx-2"
              :class="{ active: pagination.category === '' }"
              @click.prevent="getProducts()">
              <span class="material-icons-outlined me-2">menu_book</span>
              所有產品
            </a>
          </li>
          <li>
            <a
              href="#"
              class="d-flex align-items-center border-bottom border-primary p-2 mx-2"
              :class="{ active: pagination.category === '不敗經典' }"
              @click.prevent="getProducts('', '不敗經典')">
              <span class="material-icons-outlined me-2">military_tech</span>
              不敗經典
            </a>
          </li>
          <li>
            <a
              href="#"
              class="d-flex align-items-center border-bottom border-primary p-2 mx-2"
              :class="{ active: pagination.category === '就要醬吃' }"
              @click.prevent="getProducts('', '就要醬吃')">
              <span class="material-icons-outlined me-2">eco</span>
              就要醬吃
            </a>
          </li>
          <li>
            <a
              href="#"
              class="d-flex align-items-center border-bottom border-primary p-2 mx-2"
              :class="{ active: pagination.category === '加料萬歲' }"
              @click.prevent="getProducts('', '加料萬歲')">
              <span class="material-icons-outlined me-2">bubble_chart</span>
              加料萬歲
            </a>
          </li>
          <li>
            <a
              href="#"
              class="d-flex align-items-center border-bottom border-primary p-2 mx-2"
              :class="{ active: pagination.category === '微醺微醺' }"
              @click.prevent="getProducts('', '微醺微醺')">
              <span class="material-icons-outlined me-2">local_bar</span>
              微醺微醺
            </a>
          </li>
        </ul>
      </div>

      <div class="col-md-9">
        <div class="row g-3 g-md-2">
          <div
            class="col-lg-4 col-sm-6"
            v-for="product in products"
            :key="product.id"
          >
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
                    >$ {{ product.origin_price }} 元
                  </del>
                </p>
                <div class="btn-group d-flex justify-content-center">
                  <button type="button" class="btn btn-outline-danger py-2 px-1 z-20" :disabled="isSpinner" @click="toggleFavorite(product.id)">
                    <span v-if="favorite.includes(product.id)" class="material-icons-outlined align-middle">favorite</span>
                    <span v-else class="material-icons-outlined align-middle">favorite_border</span>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary py-2 px-5 z-20" :disabled="isSpinner"
                    @click="addCart(product.id)">
                    <div v-if="product.id === isSpinner" class="spinner-border spinner-border-sm m-0" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="products.length === 0" class="text-light text-center p-6">
          <span class="material-icons-outlined fs-6">fmd_bad</span>
          <p class="fs-4">查無此商品！</p>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <Pagination :pages="pagination" @emit-pages="getProducts" />
  </section>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import localStorageFavorite from '@/mixins/localStorageFavorite.js'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      favorite: JSON.parse(localStorage.getItem('favorite')) || [],
      searchValue: '',
      isLoading: false,
      isSpinner: false
    }
  },
  components: {
    Pagination
  },
  mixins: [localStorageFavorite],
  methods: {
    getProducts (page = 1, category = '') { // category 傳入空字串代表 所有商品
      this.isLoading = true

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products?page=${page}&category=${category}`
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination

          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
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
    searchProduct () {
      this.isLoading = true

      // 取得全部產品
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products

          // 關鍵字搜尋
          this.products = this.products.filter(item => item.title.trim().match(this.searchValue))
          this.searchValue = ''

          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '搜尋')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
