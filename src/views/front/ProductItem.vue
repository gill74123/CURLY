<template>
  <!-- Loading -->
  <Loading v-model:active="isLoading"></Loading>

  <div class="container py-6">
    <section class="mb-6 py-3">
      <div class="row g-5">
        <div class="col-md-6">
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

        <div class="col-md-6 d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="text-dark fs-6 m-0">{{ product.title }}</h2>
              <p v-if="product.is_recommend" class="text-primary border border-2 border-primary rounded-2 py-1 px-3">
                店長推薦
              </p>
            </div>
            <p class="text-light mb-4">
              <span class="text-primary fw-bold fs-5">$ {{ product.price }}</span> / {{ product.unit }}
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
          <div class="d-flex justify-content-start mb-4">
            <input
              type="number" min="1" class="form-control border-1 border-primary rounded-2 text-center w-25 p-3 me-3"
                v-model="productQty" :readonly="isSpinner">
            <button type="button" class="btn btn-primary text-white w-50 fw-4 py-3" :disabled="isSpinner"
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

    <section class="mb-6 py-3">
      <div class="mb-4">
        <h5 class="text-primary fw-medium">商品資訊</h5>
        <hr />
        <table class="table table-borderless text-light">
          <tbody>
            <tr>
              <td width="120">單次購買</td>
              <td>單{{ product.unit }}</td>
            </tr>
            <tr>
              <td width="120">內容量</td>
              <td>{{ product.grams }} / {{ product.unit }}</td>
            </tr>
            <tr>
              <td width="120">商品成分</td>
              <td>{{ product.content }}</td>
            </tr>
            <tr>
              <td width="120">過敏原</td>
              <td>{{ product.notice }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h5 class="text-primary fw-medium">食用說明</h5>
        <hr />
        <table class="table table-borderless text-light">
          <tbody>
            <tr>
              <td width="120">享用方式</td>
              <td>於冷凍取出退冰半小時，噴灑些許開水，180 度烤 3-5 分鐘，或覆蓋濕紙巾微波 600w 一分鐘 (依照自己烤箱做調整)才可以吃到外酥內軟的口感唷！
                <br />
                P.S.冷凍請先退回常溫再烤
              </td>
            </tr>
            <tr>
              <td width="120">賞味期限</td>
              <td>常溫1日 / 冷藏5日 / 冷凍2週</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mb-6 py-3">
      <div class="d-flex justify-content-center align-items-center mb-6">
        <div class="bg-primary" style="width: 100px; height: 2px"></div>
        <h3 class="text-primary mx-4">你可能喜歡</h3>
        <div class="bg-primary" style="width: 100px; height: 2px"></div>
      </div>
      <!-- Swiper -->
      <Swiper :filter-products='filterProducts' @get-product="getProduct"></Swiper>
    </section>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper.vue'

export default {
  data () {
    return {
      product: {},
      productId: '',
      productQty: 1,
      productCategory: '',
      filterProducts: [],
      enterImage: '',
      isLoading: false,
      isSpinner: false
    }
  },
  components: {
    Swiper
  },
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
    }
  },
  watch: {
    // 監聽 最少數量要為 1
    productQty () {
      if (this.productQty <= 0) {
        this.productQty = 1
      }
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
