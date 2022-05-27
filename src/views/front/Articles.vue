<template>
  <!-- Loading -->
  <Loading v-model:active="isLoading" />

  <section class="articles bg-banner position-relative">
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
      <p class="fs-4 fs-md-5 fw-bold">多的是你不知道的事</p>
    </h2>
  </section>

  <section class="articles container py-6 py-md-7">
    <div class="row">
      <div class="col-md-3">
        <ul class="category list-unstyled d-flex flex-row flex-md-column justify-content-between
            scrollbar sticky-top">
          <li>
            <a href="#" class="d-flex align-items-center border-bottom border-primary p-2 mx-2" :class="{active: categoryType === 'all'}"
              @click.prevent="filterArticles('all')">
              <span class="material-icons-outlined me-2">mail</span>
              所有消息
            </a>
          </li>
          <li>
            <a href="#" class="d-flex align-items-center border-bottom border-primary p-2 mx-2" :class="{active: categoryType === '公告'}"
              @click.prevent="filterArticles('公告')">
              <span class="material-icons-outlined me-2">campaign</span>
              公告
            </a>
          </li>
          <li>
            <a href="#" class="d-flex align-items-center border-bottom border-primary p-2 mx-2" :class="{active: categoryType === '活動'}"
              @click.prevent="filterArticles('活動')">
              <span class="material-icons-outlined me-2">local_florist</span>
              活動
            </a>
          </li>
          <li>
            <a href="#" class="d-flex align-items-center border-bottom border-primary p-2 mx-2" :class="{active: categoryType === '小知識'}"
              @click.prevent="filterArticles('小知識')">
              <span class="material-icons-outlined me-2">school</span>
              小知識
            </a>
          </li>
        </ul>
      </div>
      <div class="col-md-9">
        <ul class="list-unstyled text-light">
          <li class="card border-0" v-for="article in categoryArticles" :key="article.id"
            @click.prevent="seeArticle(article.id)">
            <div class="card-body p-0">
              <template v-for="tag in article.tag" :key="tag + 1">
                <span class="text-muted me-2">#{{ tag }}</span>
              </template>
              <div class="card-title">
                <h3 class="text-primary fw-bold fs-5">{{ article.title }}</h3>
              </div>
              <p class="text-end mb-3">{{ article.create_at }}</p>
              <img :src="article.image" class="card-img mb-3" :alt="article.image">
              <p class="mb-3">{{ article.description }}</p>
            </div>
            <a href="#" class="card-more stretched-link fw-medium p-2 ms-auto">MORE</a>
            <hr>
          </li>
        </ul>
      </div>
    </div>

    <!-- Pagination -->
    <Pagination :pages="pagination" @emit-pages="getArticles" />
  </section>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      articles: [],
      categoryArticles: [],
      categoryType: '',
      pagination: {},
      isLoading: false
    }
  },
  components: {
    Pagination
  },
  methods: {
    getArticles (page = 1) {
      this.isLoading = true

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

          this.filterArticles('all')

          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    filterArticles (category) {
      this.categoryArticles = []
      this.categoryType = category

      if (category === 'all') {
        this.categoryArticles = this.articles
      } else {
        this.articles.forEach(item => {
          const isIncludes = item?.tag?.includes(category)
          if (isIncludes) {
            this.categoryArticles.push(item)
          }
        })
      }
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
