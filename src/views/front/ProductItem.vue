<template>
  <!-- Loading -->
  <Loading v-model:active="isLoading" />

  <div class="container py-6 py-md-7">
    <section class="mb-4 py-3">
      <div class="row g-5">
        <div class="col-md-6" data-aos="fade-right">
          <div class="row g-2 image">
            <div class="col-9 col-md-12">
              <div class="mainImg" :style="{backgroundImage: `url(${enterImage})`}"></div>
            </div>
            <!-- PC block -->
            <div class="col-3 col-md-4 d-none d-md-block" v-for="secImage in product.imagesUrl" :key="secImage">
                <div class="secImg-box">
                  <a href="#" class="d-block secImg" :style="{backgroundImage: `url(${secImage})`}"
                    @click.prevent="changeEnterImage(secImage)">
                  </a>
                </div>
            </div>
            <!-- Mobile block -->
            <div class="col-3 col-md-4 d-md-none d-flex flex-column" >
                <div class="secImg-box mb-1" v-for="secImage in product.imagesUrl" :key="secImage">
                  <a href="#" @click.prevent="changeEnterImage(secImage)">
                    <img class="secImg" :src="secImage" :alt="secImage">
                  </a>
                </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 d-flex flex-column justify-content-between" data-aos="fade-left">
          <div>
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="d-flex align-items-center text-dark fs-6">{{ product.title }}
                <span v-if="product.is_recommend" class="material-icons-outlined fs-6 text-primary ms-2">recommend</span>
              </h2>
              <button type="button" class="d-flex align-items-center btn btn-outline-danger border-2 p-2"
                :disabled="isSpinner" @click="toggleFavorite(product.id)">
                <span v-if="favorite.includes(product.id)" class="material-icons-outlined d-none d-lg-block fs-5 fs-lg-4">favorite</span>
                <span v-else class="material-icons-outlined d-none d-lg-block fs-5 fs-lg-4">favorite_border</span>
                <span class="fw-medium ms-lg-2">收藏</span>
              </button>
            </div>
            <p class="d-flex align-items-center text-light mb-4">
              <span class="text-primary fw-bold fs-5">{{ product.price }}</span>&ensp;/&ensp;{{ product.unit }}
              <del v-if="product.price !== product.origin_price" class="fs-4 ms-3">$ {{ product.origin_price }}</del>
            </p>
            <div class="text-light mb-6">
              {{ product.description }}
            </div>
            <div class="d-flex text-primary">
              <p class="me-2">#{{ product.category }}</p>
              <p>#肉桂捲</p>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-start">
            <input
              type="number" min="1" class="form-control border-1 border-primary rounded-2 text-center w-25 py-2 me-3"
                v-model="productQty" :readonly="isSpinner" @change="editProductQty">
            <button type="button" class="btn btn-primary text-white w-50 fw-4 py-2" :disabled="isSpinner"
              @click="addCart(product.id)">
              <div v-if="product.id === isSpinner" class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-3 py-md-7">
      <div class="mb-4" data-aos="fade-up">
        <h5 class="text-primary fw-medium">商品資訊</h5>
        <hr />
        <table class="table table-borderless text-light">
          <tbody>
            <tr>
              <td width="120" class="text-align-justify">單次購買：</td>
              <td>單{{ product.unit }}</td>
            </tr>
            <tr>
              <td width="120" class="text-align-justify">內容量：</td>
              <td>{{ product.grams }} / {{ product.unit }}</td>
            </tr>
            <tr>
              <td width="120" class="text-align-justify">商品成分：</td>
              <td>{{ product.content }}</td>
            </tr>
            <tr>
              <td width="120" class="text-align-justify">過敏原：</td>
              <td>{{ product.notice }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div data-aos="fade-up">
        <h5 class="text-primary fw-medium">食用建議</h5>
        <hr />
        <table class="table table-borderless text-light">
          <tbody>
            <tr>
              <td width="120" class="text-align-justify">享用方式：</td>
              <td>
                加熱前，先將肉桂捲先退冰。<br />
                • 烤箱：預熱 170 度後肉桂捲噴灑少許水，放入烤箱加熱 3 分鐘。<br />
                • 微波爐：肉桂捲表面噴點水，放進微波爐內加熱 30 秒至 1 分鐘。<br />
                • 電鍋：加入少量水並放入肉桂捲，待電鍋跳起即可。
              </td>
            </tr>
            <tr>
              <td width="120" class="text-align-justify">賞味期限：</td>
              <td>常溫1日 / 冷藏5日 / 冷凍2週</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="py-6 py-md-7">
      <div class="d-flex justify-content-center align-items-center mb-5 mb-md-6">
        <div class="d-none d-md-block bg-primary" style="width: 100px; height: 2px"></div>
        <h3 class="d-none d-md-block text-primary mx-4">你可能喜歡</h3>
        <h3 class="d-md-none text-primary border-bottom border-primary border-2 px-2 pb-2">你可能喜歡</h3>
        <div class="d-none d-md-block bg-primary" style="width: 100px; height: 2px"></div>
      </div>
      <!-- Swiper -->
      <Swiper :filter-products='filterProducts' @get-product="getProduct" data-aos="zoom-in-left" />
    </section>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper.vue'
import localStorageFavorite from '@/mixins/localStorageFavorite.js'

export default {
  data () {
    return {
      product: {},
      productId: '',
      productQty: 1,
      productCategory: '',
      filterProducts: [],
      enterImage: '',
      favorite: JSON.parse(localStorage.getItem('favorite')) || [],
      isLoading: false,
      isSpinner: false
    }
  },
  components: {
    Swiper
  },
  mixins: [localStorageFavorite],
  methods: {
    getProduct (mayLikeProductId) { // mayLikeProductId 從 Swiper 元件傳來的
      this.isLoading = true

      let { id } = this.$route.params
      if (mayLikeProductId) {
        id = mayLikeProductId
      }

      this.productId = id
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$http.get(url)
        .then((res) => {
          this.product = res.data.product
          this.productCategory = this.product.category
          this.enterImage = this.product.imageUrl

          this.getProducts(this.product)
          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    addCart (productId) {
      this.isSpinner = productId

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`
      const data = {
        product_id: productId,
        qty: this.productQty
      }
      this.$http.post(url, { data })
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
    changeEnterImage (secImage) {
      this.enterImage = secImage
    },
    getProducts (product) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(url)
        .then((res) => {
          this.filterCategoryProducts(res.data.products, product)

          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    filterCategoryProducts (allProducts, product) {
      this.filterProducts = allProducts.filter(item => item.category === product.category)
      const arrayIndex = this.filterProducts.findIndex(item => item.id === product.id)
      this.filterProducts.splice(arrayIndex, 1)
    },
    editProductQty () {
      if (this.productQty <= 0) {
        this.$httpMessageState('errMessage', '數量最少為 1')
        this.productQty = 1
      }
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
