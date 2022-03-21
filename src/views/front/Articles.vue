<template>
  <!-- banner -->
  <section class="articles bg-banner position-relative">
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
      <p>多的是你不知道的事</p>
    </h2>
  </section>

  <!-- 文章列表 -->
  <section class="articles container py-6">
    <div class="row">
      <div class="col-md-3">
        <ul class="list-unstyled">
          <li class="border-bottom border-primary p-2">
            <a href="" class="d-flex align-items-center">
              <span class="material-icons-outlined me-2">campaign</span>
              公告
            </a>
          </li>
          <li class="border-bottom border-primary p-2">
            <a href="" class="d-flex align-items-center">
              <span class="material-icons-outlined me-2">local_florist</span>
              活動
            </a>
          </li>
          <li class="border-bottom border-primary p-2">
            <a href="" class="d-flex align-items-center">
              <span class="material-icons-outlined me-2">school</span>
              小知識
            </a>
          </li>
        </ul>
      </div>
      <div class="col-md-9">
        <ul class="list-unstyled text-light">
          <li class="card border-0" v-for="article in articles" :key="article.id" @click.prevent="seeArticle(article.id)">
            <div class="card-body p-0">
              <template v-for="tag in article.tag" :key="tag + 1">
                <span class="text-muted me-2">#{{ tag }}</span>
              </template>
              <div class="card-title d-flex justify-content-between align-items-center my-2">
                <h3 class="text-primary fw-bold fs-5">{{ article.title }}</h3>
                <p>{{ article.create_at }}</p>
              </div>
              <img :src="article.image" class="card-img mb-3" alt="article.image">
              <p class="mb-3">{{ article.description }}</p>
              <a href="" class="d-block stretched-link text-end fw-medium">MORE</a>
            </div>
            <hr>
          </li>
        </ul>
      </div>
    </div>

    <!-- Pagination -->
    <Pagination :pages="pagination" @emit-pages="getArticles"></Pagination>
  </section>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      articles: {},
      pagination: {}
    }
  },
  components: {
    Pagination
  },
  methods: {
    getArticles (page = 1) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/articles?page=${page}`
      this.$http
        .get(url)
        .then((res) => {
          this.articles = res.data.articles
          this.pagination = res.data.pagination

          this.articles.forEach(item => {
            // 將時間格式改為 YYYY-MM-DD
            item.create_at = new Date(item.create_at * 1000).toISOString().split('T')[0]
          })
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    seeArticle (articleId) {
      this.$router.push(`/article/${articleId}`)
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>
