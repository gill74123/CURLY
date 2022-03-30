<template>
  <!-- vue-loading-overlay -->
  <Loading v-model:active="isLoading"></Loading>

  <!-- banner -->
  <section class="index bg-banner position-relative">
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
      <p>— 溫度·美味·感動 —</p>
      <p>品味你的無可取代，CURLY 隨時暖心相伴</p>
    </h2>
  </section>

  <!-- 捲捲你愛哪一味 -->
  <section class="index container py-6 mb-3">
    <div class="d-flex justify-content-center align-items-center mb-6">
      <div class="bg-primary" style="width: 100px; height: 2px"></div>
      <h3 class="text-primary mx-4">捲捲 你愛哪一味</h3>
      <div class="bg-primary" style="width: 100px; height: 2px"></div>
    </div>
    <div class="row g-4 justify-content-center">
      <div class="col-6 col-md-3 card-img-box text-center">
        <router-link to="/products" class="d-block card-img"
          style="background-image: url(https://images.unsplash.com/photo-1643188389404-5a10e50023bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA0fHxjaW5uYW1vbiUyMHJvbGxzfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=600&q=60)">
          <span class="card-tag text-white fs-5 fw-medium fw-medium">不敗經典</span>
        </router-link>
      </div>
      <div class="col-6 col-md-3 card-img-box text-center">
        <router-link to="/products" class="d-block card-img"
          style="background-image: url(https://images.unsplash.com/photo-1645995575875-ea6511c9d127?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60)">
          <span class="card-tag text-white fs-5 fw-medium">就要醬吃</span>
        </router-link>
      </div>
      <div class="col-6 col-md-3 card-img-box text-center">
        <router-link to="/products" class="d-block card-img"
          style="background-image: url(https://images.unsplash.com/photo-1618256747711-c4195a69ceff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGNpbm5hbW9uJTIwcm9sbHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60)">
          <span class="card-tag text-white fs-5 fw-medium">加料萬歲</span>
        </router-link>
      </div>
      <div class="col-6 col-md-3 card-img-box text-center">
        <router-link to="/products" class="d-block card-img"
          style="background-image: url(https://images.unsplash.com/photo-1566331551467-0dc72cc80ec0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGxpcXVvciUyMCUyNiUyMGJyZWFkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60)">
          <span class="card-tag text-white fs-5 fw-medium">微醺微醺</span>
        </router-link>
      </div>
    </div>
  </section>

  <!-- 店長推薦 -->
  <div class="index bg-third mb-3">
    <section class="container py-6">
      <div class="d-flex justify-content-center align-items-center mb-6">
        <div class="bg-primary" style="width: 100px; height: 2px"></div>
        <h3 class="text-primary mx-4">捲捲 店長推薦</h3>
        <div class="bg-primary" style="width: 100px; height: 2px"></div>
      </div>
      <div class="row">
        <div class="col-md-4 pt-6">
          <h4 class="text-dark text-center text-md-start mb-3">猶豫不決嗎?<br />來看看店長推薦吧！</h4>
          <span class="d-none d-md-block text-light">想嘗試新口味卻不知從何下手？<br>快看捲捲店長在四種類別中分別推薦哪一款捲捲吧！</span>
        </div>
        <div class="col-md-8">
          <swiper :modules="modules" :slides-per-view="1" :space-between="30" :loop="true"
            :autoplay="{delay: 3000, disableOnInteraction: false,}" :breakpoints="swiperOption">
            <template v-for="product in filterProducts" :key="product.id">
              <swiper-slide>
                <a href="" class="recommend-img d-block d-flex justify-content-center align-items-center rounded-3 mb-4"
                :style="{backgroundImage: `url(${product.imageUrl})`}" @click.prevent="seeProduct(product.id)">
                  <div class="bg-light bg-opacity-25 text-center p-2">
                    <span class="text-white fs-4 fw-medium">{{ product.title }}</span>
                  </div>
                </a>
              </swiper-slide>
            </template>
          </swiper>
        </div>
      </div>
    </section>
  </div>

  <!-- 最新消息 -->
  <section class="index container py-6">
    <div class="d-flex justify-content-center align-items-center mb-6">
      <div class="bg-primary" style="width: 100px; height: 2px"></div>
      <h3 class="text-primary mx-4">捲捲 新消息</h3>
      <div class="bg-primary" style="width: 100px; height: 2px"></div>
    </div>
    <div class="row">
      <div class="col-md-6" v-for="article in filterArticles" :key="article.id">
        <a href="" class="news-info-box d-block rounded-3" @click.prevent="seeArticle(article.id)"
        :style="{backgroundImage: `url(${article.image})`}">
            <div class="news-info d-flex flex-column justify-content-end align-items-start text-white h-100 p-3">
              <span class="news-tag" v-for="tag in article.tag" :key="tag">#{{ tag }}</span>
              <h4 class="news-title fw-medium">{{ article.title }}</h4>
              <p class="news-description">{{ article.description }}</p>
            </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { Autoplay } from 'swiper'
// Import Swiper styles
import 'swiper/swiper.scss'

export default {
  data () {
    return {
      products: [],
      filterProducts: [],
      articles: [],
      filterArticles: [],
      modules: [Autoplay],
      swiperOption: {
        768: {
          slidesPerView: 2
        },
        992: {
          slidesPerView: 3
        }
      },
      isLoading: false
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    getProducts () {
      this.isLoading = true

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products
          this.filterRecommendProducts()

          this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    filterRecommendProducts () {
      this.filterProducts = this.products.filter((item) => {
        return item.is_recommend === 1
      })
    },
    seeProduct (productId) {
      this.$router.push(`/product/${productId}`)
    },
    getArticles (page = 1) {
      this.isLoading = true

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/articles?page=${page}`
      this.$http
        .get(url)
        .then((res) => {
          this.articles = res.data.articles
          this.filterNewArticles()

          this.isLoading = false
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    filterNewArticles () {
      // 取最新的兩篇文章
      this.filterArticles = []
      this.filterArticles.push(this.articles[0], this.articles[1])
    },
    seeArticle (articleId) {
      this.$router.push(`/article/${articleId}`)
    }
  },
  mounted () {
    this.getProducts()
    this.getArticles()
  }
}
</script>
