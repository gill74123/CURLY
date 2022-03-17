<template>
  <!-- banner -->
  <section class="bg-banner position-relative">
    <h2
      class="text-white position-absolute top-50 start-50 translate-middle m-0"
    >
      暖胃又暖心的好味道
    </h2>
  </section>

  <!-- 產品列表 -->
  <section class="container my-6">
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
          "
        >
          <li>
            <a href="" class="border-bottom border-primary p-2">所有產品</a>
          </li>
          <li>
            <a href="#" class="border-bottom border-primary p-2">不敗經典</a>
          </li>
          <li>
            <a href="#" class="border-bottom border-primary p-2">就要醬吃</a>
          </li>
          <li>
            <a href="#" class="border-bottom border-primary p-2">加料萬歲</a>
          </li>
          <li>
            <a href="#" class="border-bottom border-primary p-2">微醺微醺</a>
          </li>
        </ul>
      </div>
      <div class="col-md-9">
        <div class="row g-3 g-md-2">
          <div class="col-lg-4 col-sm-6" v-for="product in products" :key="product.id">
            <div class="card">
              <div class="card-img-box" @click.prevent="seeProduct(product.id)">
                <a href="" class="img-hover-scale" >
                  <img :src="product.imageUrl" class="card-img" alt="" />
                </a>
              </div>
              <div class="card-body text-center">
                <h5 class="card-title text-primary">{{ product.title }}</h5>
                <p class="card-text mb-4">
                  <span class="text-danger fs-4 fw-bold">$ {{ product.price }} 元</span>
                  <del v-if="product.origin_price !== product.price" class="text-light ms-2">$ {{ product.origin_price }} 元</del>
                </p>
                <button type="button" class="btn btn-outline-primary px-5" @click="addCart(product.id)">加入購物車</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box"></div>
    </div>
    <!-- Pagination -->
    <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
  </section>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {}
    }
  },
  components: {
    Pagination
  },
  methods: {
    getProducts (page = 1) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products?page=${page}`
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          // this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addCart (productId, qty = 1) {
      // this.spinnerOn = id
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`
      const data = {
        product_id: productId,
        qty: qty
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
    },
    seeProduct (productId) {
      this.$router.push(`/product/${productId}`)
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
