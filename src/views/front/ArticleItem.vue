<template>
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
      <a href="" class="btn d-flex align-items-center text-primary">
        <span class="material-icons-outlined fs-5">chevron_left</span>
        上一篇：
      </a>
      <a href="" class="btn d-flex align-items-center text-primary">
        下一篇：
        <span class="material-icons-outlined fs-5">chevron_right</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: {}
    }
  },
  methods: {
    getArticle () {
      const { id } = this.$route.params
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/article/${id}`
      this.$http
        .get(url)
        .then((res) => {
          this.article = res.data.article
          this.article.create_at = new Date(this.article.create_at * 1000).toISOString().split('T')[0]
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  },
  mounted () {
    this.getArticle()
  }
}
</script>
