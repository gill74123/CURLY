<template>
  <!-- vue-loading-overlay -->
  <Loading v-model:active="isLoading"></Loading>

  <div class="article container my-6">
    <div class="border py-4 mb-3">
      <div class="text-center text-light mb-5">
        <p>{{ article.create_at }}</p>
        <h2 class="text-primary fw-bold my-3">{{ article.title }}</h2>
        <p>By {{ article.author }}</p><br>
        <template v-for="tag in article.tag" :key="tag + 1">
          <span class="me-2"># {{tag}}</span>
        </template>
      </div>
      <div class="px-6">
        <img class="card-img w-100 mb-3"
        :src="article.image" alt="article.image">
        <div v-html="article.content"></div>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <a href="" v-if="paginationData.has_pre" class="btn d-flex align-items-center text-primary px-0"
        @click.prevent="changeArticlePage(paginationData.pre_info.id)">
        <span class="material-icons-outlined fs-5">chevron_left</span>
        上一篇：{{ paginationData.pre_info?.title }}
      </a>
      <a href="" v-if="paginationData.has_next" class="btn d-flex align-items-center text-primary px-0 ms-auto"
        @click.prevent="changeArticlePage(paginationData.next_info.id)">
        下一篇：{{ paginationData.next_info?.title }}
        <span class="material-icons-outlined fs-5">chevron_right</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: {},
      articlesData: [],
      articleId: '',
      paginationData: {
        current_index: '',
        has_pre: '',
        has_next: '',
        pre_info: {},
        next_info: {}
      },
      isLoading: false
    }
  },
  methods: {
    getArticle () {
      this.isLoading = true

      let { id } = this.$route.params
      if (this.articleId) {
        id = this.articleId
      }

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/article/${id}`
      this.$http
        .get(url)
        .then((res) => {
          this.article = res.data.article
          this.article.create_at = new Date(this.article.create_at * 1000).toISOString().split('T')[0]
          this.getArticles()

          this.isLoading = false
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    getArticles () {
      this.isLoading = true

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/articles`
      this.$http
        .get(url)
        .then((res) => {
          this.articlesData = res.data.articles
          this.articlePagination()

          this.isLoading = false
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    articlePagination () {
      const currentIndex = this.articlesData.findIndex(item => item.id === this.article.id)
      const lastIndex = this.articlesData.length - 1
      this.paginationData = {
        current_index: currentIndex,
        has_next: !(currentIndex === lastIndex),
        has_pre: !(currentIndex === 0),
        pre_info: {},
        next_info: {}
      }

      if (this.paginationData.has_next) {
        this.paginationData.next_info = this.articlesData[this.paginationData.current_index + 1]
      }
      if (this.paginationData.has_pre) {
        this.paginationData.pre_info = this.articlesData[this.paginationData.current_index - 1]
      }
    },
    changeArticlePage (articleId) {
      this.$router.push(`/article/${articleId}`)
      this.articleId = articleId
      this.getArticle()
    }
  },
  mounted () {
    this.getArticle()
  }
}
</script>
