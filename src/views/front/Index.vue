<template>
  <!-- Loading -->
  <Loading v-model:active="isLoading"></Loading>

  <section class="index bg-banner position-relative">
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
        p-3 py-4"
    >
      <p class="fw-bold mb-2">溫度·美味·感動</p>
      <p class="d-none d-md-block fs-4">品味你的無可取代，CURLY 隨時暖心相伴</p>
    </h2>
    <div class="d-flex justify-content-between position-absolute top-75 start-50 translate-middle w-75 w-md-50 w-lg-25">
      <router-link to="/products"
        class="d-block btn btn-outline-secondary border-2 fw-bold py-2 me-3 w-50">
        前往購物
      </router-link>
      <router-link to="/about"
        class="d-block btn btn-outline-secondary border-2 fw-bold py-2 w-50">
        關於我們
      </router-link>
    </div>
  </section>

  <section class="index container py-6 py-md-7">
    <div class="d-flex justify-content-center align-items-center mb-5 mb-md-6">
      <div class="d-none d-md-block bg-primary" style="width: 100px; height: 2px"></div>
      <h3 class="d-none d-md-block text-primary mx-4">捲捲 你愛哪一味</h3>
      <h3 class="d-md-none text-primary border-bottom border-primary border-2 px-2 pb-2">捲捲 你愛哪一味</h3>
      <div class="d-none d-md-block bg-primary" style="width: 100px; height: 2px"></div>
    </div>
    <div class="row g-4 justify-content-center">
      <div class="col-6 col-md-3 card-img-box text-center">
        <router-link to="/products" class="d-block card-img image-category-1">
          <span class="card-tag text-white fs-5 fw-medium">不敗<br />經典</span>
        </router-link>
      </div>
      <div class="col-6 col-md-3 card-img-box text-center">
        <router-link to="/products" class="d-block card-img image-category-2">
          <span class="card-tag text-white fs-5 fw-medium">就要<br />醬吃</span>
        </router-link>
      </div>
      <div class="col-6 col-md-3 card-img-box text-center">
        <router-link to="/products" class="d-block card-img image-category-3">
          <span class="card-tag text-white fs-5 fw-medium">加料<br />萬歲</span>
        </router-link>
      </div>
      <div class="col-6 col-md-3 card-img-box text-center">
        <router-link to="/products" class="d-block card-img image-category-4">
          <span class="card-tag text-white fs-5 fw-medium">微醺<br />微醺</span>
        </router-link>
      </div>
    </div>
  </section>

  <section class="index bg-third mb-3">
    <div class="container py-6 py-md-7">
      <div class="d-flex justify-content-center align-items-center mb-5 mb-md-6">
        <div class="d-none d-md-block bg-primary bg-primary" style="width: 100px; height: 2px"></div>
        <h3 class="d-none d-md-block text-primary mx-4">捲捲 店長推薦</h3>
        <h3 class="d-md-none text-primary border-bottom border-primary border-2 px-2 pb-2">捲捲 店長推薦</h3>
        <div class="d-none d-md-block bg-primary bg-primary" style="width: 100px; height: 2px"></div>
      </div>
      <div class="row">
        <div class="col-md-4 pt-md-6">
          <h4 class="text-light text-center text-md-start fw-medium mb-3">猶豫不決嗎?
            <br />
            來看看店長推薦吧！</h4>
          <span class="d-none d-md-block text-light">想嘗試新口味卻不知從何下手？
            <br />
            快看捲捲店長在四種類別中分別推薦哪一款捲捲吧！</span>
        </div>
        <div class="col-md-8">
          <!-- Swiper -->
          <Swiper :filter-products='filterProducts'></Swiper>
        </div>
      </div>
    </div>
  </section>

  <!-- 最新消息 -->
  <section class="index container py-6 py-md-7">
    <div class="d-flex justify-content-center align-items-center mb-5 mb-md-6">
      <div class="d-none d-md-block bg-primary bg-primary" style="width: 100px; height: 2px"></div>
      <h3 class="d-none d-md-block text-primary mx-4">捲捲 新消息</h3>
      <h3 class="d-md-none text-primary border-bottom border-primary border-2 px-2 pb-2">捲捲 新消息</h3>
      <div class="d-none d-md-block bg-primary bg-primary" style="width: 100px; height: 2px"></div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-3 mb-md-0" v-for="article in filterArticles" :key="article.id">
        <a href="#" class="news-info-box d-block rounded-3" @click.prevent="seeArticle(article.id)"
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
import Swiper from '@/components/Swiper.vue'

export default {
  data () {
    return {
      products: [],
      filterProducts: [],
      articles: [],
      filterArticles: [],
      isLoading: false
    }
  },
  components: {
    Swiper
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
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    filterRecommendProducts () {
      this.filterProducts = this.products.filter(item => item.is_recommend === 1)
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
          this.$httpMessageState(err.response, '錯誤訊息')
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
