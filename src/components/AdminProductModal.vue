<template>
  <div
    class="modal fade"
    ref="modal"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-white">{{ is_new ? '新增產品' : '編輯產品' }}</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <nav class="mb-3">
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button class="nav-link active" id="nav-productInfo-tab" data-bs-toggle="tab" data-bs-target="#nav-productInfo" type="button" role="tab" aria-controls="nav-productInfo" aria-selected="true">商品資訊</button>
              <button class="nav-link" id="nav-productContent-tab" data-bs-toggle="tab" data-bs-target="#nav-productContent" type="button" role="tab" aria-controls="nav-productContent" aria-selected="false">商品內容</button>
              <button class="nav-link" id="nav-productImage-tab" data-bs-toggle="tab" data-bs-target="#nav-productImage" type="button" role="tab" aria-controls="nav-productImage" aria-selected="false">商品圖片</button>
            </div>
          </nav>
          <div class="tab-content px-2" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-productInfo" role="tabpanel" aria-labelledby="nav-productInfo-tab">
              <div class="row g-3">
                <div class="col-12">
                  <label for="title" class="form-label"><span class="text-danger me-1">*</span>商品名稱</label>
                  <input id="title" type="text" class="form-control bg-white" placeholder="請輸入標題"
                  v-model="tempProduct.title" required/>
                </div>
                <div class="col-4">
                  <label for="category" class="form-label"><span class="text-danger me-1">*</span>分類</label>
                  <input id="category" type="text" class="form-control bg-white" placeholder="請輸入分類"
                    v-model="tempProduct.category"/>
                </div>
                <div class="col-4">
                  <label for="grams" class="form-label"><span class="text-danger me-1">*</span>內容量</label>
                  <input id="grams" type="text" class="form-control bg-white" placeholder="請輸入幾內容量"
                    v-model="tempProduct.grams"/>
                </div>
                <div class="col-4">
                  <label for="unit" class="form-label"><span class="text-danger me-1">*</span>單位</label>
                  <input id="unit" type="text" class="form-control bg-white" placeholder="請輸入單位"
                    v-model="tempProduct.unit"/>
                </div>
                <div class="col-6">
                  <label for="origin_price" class="form-label"><span class="text-danger me-1">*</span>原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control bg-white" placeholder="請輸入原價"
                    v-model="tempProduct.origin_price"/>
                </div>
                <div class="col-6">
                  <label for="price" class="form-label"><span class="text-danger me-1">*</span>售價</label>
                  <input id="price" type="number" min="0" class="form-control bg-white" placeholder="請輸入售價"
                    v-model="tempProduct.price"/>
                </div>
              </div>
              <hr />
              <div class="d-flex">
                <div class="form-check me-3">
                  <input id="is_enabled" class="form-check-input" type="checkbox"
                  v-model="tempProduct.is_enabled" :true-value="1" :false-value="0"/>
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
                <div class="form-check">
                  <input id="is_recommend" class="form-check-input  text-dark" type="checkbox"
                  v-model="tempProduct.is_recommend" :true-value="1" :false-value="0"/>
                  <label class="form-check-label" for="is_recommend">店長推薦</label>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="nav-productContent" role="tabpanel" aria-labelledby="nav-productContent-tab">
              <div class="row g-3">
                <div class="col-12">
                  <label for="description" class="form-label">商品描述</label>
                  <textarea id="description" type="text" class="form-control bg-white" placeholder="請輸入產品描述"
                  v-model="tempProduct.description">
                  </textarea>
                </div>
                <div class="col-12">
                  <label for="content" class="form-label">商品成分</label>
                  <textarea id="content" type="text" class="form-control bg-white" placeholder="請輸入商品成分"
                    v-model="tempProduct.content">
                  </textarea>
                </div>
                <div class="col-12">
                  <label for="notice" class="form-label">商品過敏源</label>
                  <textarea id="notice" type="text" class="form-control bg-white" placeholder="請輸入商品過敏源"
                    v-model="tempProduct.notice">
                  </textarea>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="nav-productImage" role="tabpanel" aria-labelledby="nav-productImage-tab">
              <div class="row g-2 justify-content-between mb-4">
                <div class="col-4 image-box d-flex justify-content-center align-items-center">
                  <span v-if="tempProduct.productImage.length === 0" class="material-icons-outlined fs-6 text-gray">image</span>
                  <template v-else>
                    <img :src="tempProduct.productImage[0]" alt="" class="image-product">
                    <a href="" class="text-light" @click.prevent="delImage(0)">
                      <span class="material-icons-outlined position-absolute top-0 start-100 translate-middle">remove_circle_outline</span>
                    </a>
                    <a href="" class="image-main text-center p-1"
                      :class="tempProduct.imageUrl === tempProduct.productImage[0] ? 'active' : ''" @click.prevent="mainImage(0)">
                      設為主圖片
                    </a>
                  </template>
                </div>
                <div class="col-4 image-box d-flex justify-content-center align-items-center">
                  <span v-if="tempProduct.productImage.length < 2" class="material-icons-outlined fs-6 text-gray">image</span>
                  <template v-else>
                    <img :src="tempProduct.productImage[1]" alt="" class="image-product">
                    <a href="" class="text-light" @click.prevent="delImage(1)">
                      <span class="material-icons-outlined position-absolute top-0 start-100 translate-middle">remove_circle_outline</span>
                    </a>
                    <a href="" class="image-main text-center p-1"
                      :class="tempProduct.imageUrl === tempProduct.productImage[1] ? 'active' : ''" @click.prevent="mainImage(1)">
                      設為主圖片
                    </a>
                  </template>
                </div>
                <div class="col-4 image-box d-flex justify-content-center align-items-center">
                  <span v-if="tempProduct.productImage.length < 3" class="material-icons-outlined fs-6 text-gray">image</span>
                  <template v-else>
                    <img :src="tempProduct.productImage[2]" alt="" class="image-product">
                    <a href="" class="text-light" @click.prevent="delImage(2)">
                      <span class="material-icons-outlined position-absolute top-0 start-100 translate-middle">remove_circle_outline</span>
                    </a>
                    <a href="" class="image-main text-center p-1"
                      :class="tempProduct.imageUrl === tempProduct.productImage[2] ? 'active' : ''" @click.prevent="mainImage(2)">
                      設為主圖片
                    </a>
                  </template>
                </div>
                <div class="col-4 image-box d-flex justify-content-center align-items-center">
                  <span v-if="tempProduct.productImage.length < 4" class="material-icons-outlined fs-6 text-gray">image</span>
                  <template v-else>
                    <img :src="tempProduct.productImage[3]" alt="" class="image-product">
                    <a href="" class="text-light" @click.prevent="delImage(3)">
                      <span class="material-icons-outlined position-absolute top-0 start-100 translate-middle">remove_circle_outline</span>
                    </a>
                    <a href="" class="image-main text-center p-1"
                      :class="tempProduct.imageUrl === tempProduct.productImage[3] ? 'active' : ''" @click.prevent="mainImage(3)">
                      設為主圖片
                    </a>
                  </template>
                </div>
                <div class="col-12">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <div class="input-group mb-3">
                    <input type="text" class="imageInput form-control bg-white" placeholder="請輸入圖片連結" ref="imageUrl"/>
                    <button type="button" class="btn btn-outline-light" @click="imageUpload('imageUrl')">
                      上傳圖片
                    </button>
                  </div>
                </div>
                <div class="col-12">
                  <label for="imageUrl" class="form-label">上傳檔案</label>
                  <div class="input-group">
                    <input type="file" class="imageInput form-control bg-white" id="fileInput" ref="fileInput"/>
                    <button type="button" class="btn btn-outline-light" @click="imageUpload('imageFile')">
                      上傳圖片
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-light" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="updateProduct(tempProduct.id)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: ['temp-product', 'is_new'],
  data () {
    return {
      imageInput: '',
      productImage: []
    }
  },
  mixins: [modalMixin],
  methods: {
    updateProduct (productId) {
      // Vue 在更新 DOM 的時候是非同步的，導致 ProductModal 拿到的 props 資料與父元件不一致
      // 使用 nextTick() 當 DOM 更新後才執行
      this.$nextTick(() => {
        let url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/product/${productId}`
        let httpMethod = 'put'
        let messageStatus = '更新產品'

        if (this.is_new) {
          url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/product`
          httpMethod = 'post'
          messageStatus = '新增產品'
        }

        this.$http[httpMethod](url, { data: this.tempProduct })
          .then((res) => {
            this.$httpMessageState(res, messageStatus)
            // 關閉 Modal
            this.hideModal()

            // 執行 取得產品列表，此方法在外層所以要用 emit
            this.$emit('get-products')
          })
          .catch((err) => {
            this.$httpMessageState(err.response, messageStatus)
          })
      })
    },
    imageUpload (imageStatus) {
      if (imageStatus === 'imageUrl') {
        // 用網址新增圖片
        this.tempProduct.productImage.push(this.imageInput[0].value)
        // 清空 input 欄位
        this.imageInput[0].value = ''
        this.addImageToTempProduct()
      } else if (imageStatus === 'imageFile') {
        // 用檔案新增圖片
        const file = this.imageInput[1].files[0]

        // 將格式傳換成 formData
        const formData = new FormData()
        formData.append('file-to-upload', file)

        const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/upload`
        this.$http
          .post(url, formData)
          .then((res) => {
            this.tempProduct.productImage.push(res.data.imageUrl)
            this.$httpMessageState(res, '圖片上傳')

            // 清空 input 欄位
            this.imageInput[1].value = ''
            this.addImageToTempProduct()
          })
          .catch((err) => {
            this.$httpMessageState(err.response, '圖片上傳')
          })
      }
    },
    addImageToTempProduct () {
      this.tempProduct.imageUrl = this.tempProduct.productImage[0] // 預設第一張照片是主圖
      const secImages = [...this.tempProduct.productImage]
      secImages.shift()
      this.tempProduct.imagesUrl = secImages
    },
    mainImage (index) {
      this.tempProduct.imageUrl = this.tempProduct.productImage[index]
      const secImages = [...this.tempProduct.productImage]
      secImages.splice(index, 1)
      this.tempProduct.imagesUrl = secImages
    },
    delImage (index) {
      this.tempProduct.productImage.splice(index, 1)
      this.addImageToTempProduct()
    }
  },
  mounted () {
    this.imageInput = [...document.querySelectorAll('.imageInput')] // 從類陣列變成陣列
  }
}
</script>
