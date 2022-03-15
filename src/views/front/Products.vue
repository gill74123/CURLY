<template>
  <!-- banner -->
  <section class="bg-banner position-relative">
    <h2
      class="text-white position-absolute top-50 start-50 translate-middle m-0"
    >
      找到專屬你的滋味
    </h2>
  </section>

  <!-- 產品列表 -->
  <div class="container my-6">
    <div class="row">
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
            <a href="#" class="border-bottom border-primary p-2">大人味蕾</a>
          </li>
        </ul>
      </div>
      <div class="col-md-9">
        <div class="row g-3 justify-content-between">
          <div class="col-md-4 col-sm-6" v-for="product in products" :key="product.id">
            <div class="card">
              <img :src="product.imageUrl" class="card-img" alt="" />
              <div class="card-body text-center">
                <h4 class="card-title">{{ product.title }}</h4>
                <p class="card-text">
                  <span class="text-danger">$ {{ product.price }} 元</span>
                  <del v-if="product.origin_price !== product.price" class="ms-2">$ {{ product.origin_price }} 元</del>
                </p>
                <button type="button" class="btn btn-outline-primary">加入購物車</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts (page = 1) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products?page=${page}`
      this.$http
        .get(url)
        .then((res) => {
          console.log(res)
          this.products = res.data.products
          console.log(this.products)
          // this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
