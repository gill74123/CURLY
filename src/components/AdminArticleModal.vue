<template>
    <div
    id="articleModal"
    ref="modal"
    class="modal fade"
    aria-labelledby="articleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 id="articleModalLabel" class="modal-title">
            <span>新增貼文</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <div class="row g-2 mb-2">
            <div class="col-12">
              <label for="title" class="form-label">貼文標題</label>
              <input id="title" type="text" class="form-control" placeholder="輸入標題"
              v-model="tempArticle.title">
            </div>
            <div class="col-12">
              <label for="subtitle" class="form-label">副標題</label>
              <input id="subtitle" type="text" class="form-control" placeholder="輸入副標題"
              v-model="tempArticle.description">
            </div>
          </div>
          <div class="row g-2">
            <div class="col-6">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">封面圖</label>
                <div class="input-group mb-2">
                  <input
                    type="text"
                    class="form-control imageInput"
                    placeholder="可以透過外部圖片 URL 上傳"
                    ref="imageUrl">
                  <button
                    type="button"
                    class="btn btn-outline-light"
                    @click="imageUpload('imageUrl')">
                    上傳圖片
                  </button>
                </div>
                <div class="input-group">
                  <input
                    class="form-control imageInput"
                    type="file"
                    id="fileInput"
                    ref="fileInput">
                  <button
                    type="button"
                    class="btn btn-outline-light"
                    @click="imageUpload('imageFile')">
                    上傳圖片
                  </button>
                </div>
              </div>
              <div class="image-cover border rounded-2" :style="{backgroundImage: `url(${tempArticle.image})`}"></div>
            </div>
            <div class="col-6 d-flex flex-column justify-content-between">
              <div class="mb-2">
                <label for="tag" class="form-label">標籤</label>
                <input id="tag" type="text" class="form-control" placeholder="輸入標籤，用 [ ENTER ] 新增"
                  v-model="tagValue" @keyup.enter="addTag(tagValue)">
              </div>
              <div class="d-flex flex-wrap mb-1">
                <button type="button" class="d-flex align-items-center btn btn-gray btn-sm rounded-3 me-1 mb-1"
                  v-for="(tag, index) in tempArticle.tag" :key="tag">
                  <span>{{ tag }}</span>
                  <i class="material-icons-round fs-3 ms-1" @click="removeTag(index)">clear</i>
                </button>
              </div>
              <div class="mb-2">
                <label for="author" class="form-label">發佈者</label>
                <input id="author" type="text" class="form-control" placeholder="輸入發佈者"
                  v-model="tempArticle.author">
              </div>
              <div>
                <label for="create_at" class="form-label">發佈日期</label>
                <input id="create_at" type="date" class="form-control"
                  v-model="tempArticle.createTime">
              </div>
            </div>
          </div>
          <hr>
          <div class="mb-2">
            <!-- ckeditor -->
            <ckeditor :editor="editor" :config="editorConfig" v-model="tempArticle.content"></ckeditor>
          </div>
          <div class="form-check me-3">
            <input
              id="isPublic"
              class="form-check-input"
              type="checkbox"
              v-model="tempArticle.isPublic"
              :true-value="true"
              :false-value="false">
            <label class="form-check-label" for="isPublic">是否公開</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-light"
            data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="updateArticle(tempArticle.id)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import MyUploadAdapter from '@/methods/uploadAdapter'

// UploadAdapterPlugin
function MyCustomUploadAdapterPlugin (editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader)
  }
}

export default {
  props: ['temp-article', 'is_new'],
  data () {
    return {
      tagValue: '',
      imageInput: '',
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', 'blockquote', 'link', '|', 'numberedList', 'bulletedList', '|', 'undo', 'redo'],
        extraPlugins: [MyCustomUploadAdapterPlugin]
      }
    }
  },
  mixins: [modalMixin],
  methods: {
    updateArticle (articleId) {
      // 更新 DOM 的時候會有非同步，導致 ArticleModal 拿到的 props 資料與父元件不一致
      // 使用 nextTick() 當 DOM 更新後才執行
      this.$nextTick(() => {
        let url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/article/${articleId}`
        let httpMethod = 'put'
        let messageStatus = '更新貼文'

        if (this.is_new === true) {
          url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/article`
          httpMethod = 'post'
          messageStatus = '新增貼文'
        }

        this.$http[httpMethod](url, { data: this.tempArticle })
          .then((res) => {
            this.$httpMessageState(res, messageStatus)
            this.hideModal()

            // 執行 父層取得產品列表
            this.$emit('get-articles')
          })
          .catch((err) => {
            this.$httpMessageState(err.response, messageStatus)
          })
      })
    },
    addTag (tagValue) {
      this.tempArticle.tag.push(tagValue)
      this.tagValue = ''
    },
    removeTag (index) {
      this.tempArticle.tag.splice(index, 1)
    },
    imageUpload (imageStatus) {
      if (imageStatus === 'imageUrl') { // 用網址新增圖片
        this.tempArticle.image = (this.imageInput[0].value)
        this.imageInput[0].value = ''
      } else if (imageStatus === 'imageFile') { // 用檔案新增圖片
        const file = this.imageInput[1].files[0]

        // 將格式傳換成 formData
        const formData = new FormData()
        formData.append('file-to-upload', file)

        const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/upload`
        this.$http
          .post(url, formData)
          .then((res) => {
            this.tempArticle.image = (res.data.imageUrl)

            this.$httpMessageState(res, '圖片上傳')
            this.imageInput[1].value = ''
          })
          .catch((err) => {
            this.$httpMessageState(err.response, '圖片上傳')
          })
      }
    }
  },
  watch: {
    tempArticle () {
      // 將時間格式改為 YYYY-MM-DD
      const createTime = new Date(this.tempArticle.create_at * 1000).toISOString().split('T')[0]
      this.tempArticle.createTime = createTime

      // 因編輯相關功能打得 API 不一樣，所以 itemArticle 會接到原本狀態的資訊
      if (this.is_new === 'editPublic') {
        this.tempArticle.isPublic = !(this.tempArticle.isPublic)
      }
    }
  },
  mounted () {
    this.imageInput = [...document.querySelectorAll('.imageInput')] // 從類陣列變成陣列
  }
}
</script>

<style lang="scss">
/* ckeditor link 功能與 Modal 的 focus 有衝突 */
:root {
    --ck-z-default: 100;
    --ck-z-modal: calc( var(--ck-z-default) + 999 );
}
</style>
