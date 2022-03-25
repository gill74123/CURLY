<template>
  <div class="container">
    <!-- 商品主要內容 -->
    <section class="mb-6">
      <div class="row g-5">
        <!-- 產品圖片 -->
        <div class="col-md-6">
          <div class="row g-2 image justify-content-between">
            <div class="col-9 col-md-12">
              <img
                class="mainImg"
                :src="product.imageUrl"
                alt=""
              />
            </div>
            <div class="col-3 col-md-12">
              <div
                class="
                  d-flex
                  flex-column flex-md-row
                  justify-content-between
                  h-100
                "
              >
                <div class="secImg-box" v-for="secImage in product.imagesUrl" :key="secImage">
                  <a href="">
                    <img class="secImg" :src="secImage" alt=""/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 產品內容 -->
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
              v-model="productQty"
            />
            <button type="button" class="btn btn-primary text-white w-50 fw-4 py-3"
              @click="addCart(product.id)">
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 商品詳細資訊 -->
    <section class="mb-6">
      <div class="mb-4">
        <h5 class="text-dark">商品資訊</h5>
        <hr />
        <table class="table table-borderless text-light">
          <tbody>
            <tr>
              <td width="120">單次購買</td>
              <td>單{{ product.unit }}</td>
            </tr>
            <tr>
              <td width="120">內容量</td>
              <td>{{ product.grams }}/{{ product.unit }}</td>
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
        <h5 class="text-dark">食用說明</h5>
        <hr />
        <table class="table table-borderless text-light">
          <tbody>
            <tr>
              <td width="120">享用方式</td>
              <td>於冷凍取出退冰半小時，噴灑些許開水，180 度烤 3-5 分鐘，或覆蓋濕紙巾微波 600w 一分鐘 (依照自己烤箱做調整)才可以吃到外酥內軟的口感唷！
                <br>P.S.冷凍請先退回常溫再烤
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

    <!-- 相關商品 -->
    <section class="mb-6">
      <h3 class="text-center">相關商品</h3>
      <div class="border text-center">放篩選過後的產品 (swiper)</div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      productId: '',
      isLoading: false,
      productQty: 1,
      spinnerOn: false
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.productId = id
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$http.get(url)
        .then((res) => {
          this.product = res.data.product

          // this.isLoading = false
        })
    },
    addCart (productId) {
      // this.spinnerOn = id
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`
      const data = {
        product_id: productId,
        qty: this.productQty
      }
      this.$http.post(url, { data })
        .then((res) => {
          // this.spinnerOn = ''

          // 跨元件去呼叫 getCart
          this.$emitter.emit('get-cart')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
