<template>
  <!-- Loading -->
  <Loading v-model:active="isLoading"></Loading>

  <div class="px-6 py-3">
    <div class="d-flex justify-content-end align-items-center my-4">
      <button
        type="button"
        class="btn btn-primary d-flex align-items-center px-3 py-2"
        @click="openModal('new')"
      >
        <span class="material-icons-outlined me-2">add_circle_outline</span>
        <span>新增貼文</span>
      </button>
    </div>
    <table class="table table-borderless mb-4">
      <thead class="border-bottom border-primary text-light">
        <tr class="fw-medium">
          <th scope="col" width="130">建立時間</th>
          <th scope="col" width="300">標題</th>
          <th scope="col">作者</th>
          <th scope="col">標籤</th>
          <th scope="col" width="150">是否公開</th>
          <th scope="col">編輯/刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-bottom align-middle" v-for="article in articles" :key="article.id">
          <td>{{ article.createTime }}</td>
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>
            <span
              v-for="(tag, index) in article.tag"
              :key="`tag+${index}`"
              class="border border-light rounded-2 p-1 me-2"
              ># {{ tag }}
            </span>
          </td>
          <td>
            <div class="form-check form-switch p-0">
              <input
                class="form-check-input ms-0 me-2"
                type="checkbox"
                role="switch"
                id="article.id"
                v-model="article.isPublic"
                :true-value="true"
                :false-value="false"
                @change="updateArticle(article, 'editPublic')">
              <label
                class="form-check-label"
                for="article.id"
                :class="{
                  'text-success': article.isPublic,
                  'text-danger': !article.isPublic,
                }"
                >{{ article.isPublic ? "公開" : "隱藏" }}</label
              >
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="openModal('edit', article)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                :disabled="article.isPublic"
                @click="openModal('articleDelete', article)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- AdminArticleModal -->
    <AdminArticleModal ref="articleModal" :temp-article="tempArticle" :is_new="isNew"
      @get-articles="getArticles"></AdminArticleModal>
    <!-- AdminDelModal -->
    <AdminDelModal ref="delModal" :del-modal-status="delModalStatus" :temp-article="tempArticle"
      @get-articles="getArticles"></AdminDelModal>
    <!-- Pagination -->
    <Pagination :pages="pagination" @emit-pages="getArticles"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import AdminArticleModal from '@/components/AdminArticleModal.vue'
import AdminDelModal from '@/components/AdminDelModal.vue'

export default {
  data () {
    return {
      articles: [],
      tempArticle: {
        isPublic: true,
        tag: []
      },
      pagination: {},
      isNew: true,
      delModalStatus: '',
      isLoading: false
    }
  },
  components: {
    Pagination,
    AdminArticleModal,
    AdminDelModal
  },
  methods: {
    getArticles (category, page = 1) {
      this.isLoading = true

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`
      this.$http
        .get(url)
        .then((res) => {
          this.articles = res.data.articles
          this.pagination = res.data.pagination

          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    getItemArticle (articleId, editPublic) {
      // 取得貼文內容打此 API
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/article/${articleId}`
      this.$http
        .get(url)
        .then((res) => {
          this.tempArticle = res.data.article

          // 設定 'editPublic' 字樣，區分開關與點編輯按鈕
          if (editPublic === 'editPublic') {
            this.$refs.articleModal.updateArticle(articleId)
          }
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    updateArticle (item, editPublic) {
      this.getItemArticle(item.id, editPublic)
      this.isNew = editPublic
    },
    openModal (modalStatus, item) {
      if (modalStatus === 'new') { // 新增 - 清空選取產品內資料
        this.tempArticle = {
          // 因 tempArticle 一有變動就會做時間轉換，所以先賦予當下的時間
          create_at: new Date().getTime() / 1000,
          isPublic: true,
          tag: []
        }
        this.isNew = true
        this.$refs.articleModal.openModal()
      } else if (modalStatus === 'edit') { // 編輯
        this.getItemArticle(item.id)
        this.isNew = false
        this.$refs.articleModal.openModal()
      } else if (modalStatus === 'articleDelete') { // 刪除
        this.tempArticle = { ...item }
        this.delModalStatus = modalStatus
        this.$refs.delModal.openModal()
      }
    }
  },
  watch: {
    articles () {
      this.articles.forEach(item => {
        // 將時間格式改為 YYYY-MM-DD
        item.createTime = new Date(item.create_at * 1000).toISOString().split('T')[0]
      })
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>
