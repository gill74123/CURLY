<template>
  <div class="px-6 py-3">
    <div class="d-flex justify-content-end align-items-center my-4">
      <button
        class="btn btn-primary d-flex align-items-center px-3 py-2"
        @click="openModal('new')"
      >
        <span class="material-icons-outlined me-2">add_circle_outline</span>
        <span>新增產品</span>
      </button>
    </div>
    <table class="table table-borderless mb-4">
      <thead class="border-bottom border-primary text-light">
        <tr>
          <th scope="col" width="150">分類</th>
          <th scope="col">商品名稱</th>
          <th scope="col">原價</th>
          <th scope="col">售價</th>
          <th scope="col" width="180">是否推薦</th>
          <th scope="col" width="180">啟用狀態</th>
          <th scope="col" width="150">編輯 / 刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-bottom" v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.origin_price }}</td>
          <td>{{ product.price }}</td>
          <td>
            <div class="form-check form-switch p-0">
              <input
                class="form-check-input ms-0 me-3"
                type="checkbox"
                role="switch"
                id="product.id"
                v-model="product.is_recommend"
                :true-value="1"
                :false-value="0"
                @change="updateProduct(product)"
              />
              <label
                class="form-check-label"
                for="product.id"
                :class="{
                  'text-success': product.is_recommend,
                  'text-danger': !product.is_recommend,
                }"
                >{{ product.is_recommend ? "推推" : "尚未" }}</label
              >
            </div>
          </td>
          <td>
            <div class="form-check form-switch p-0">
              <input
                class="form-check-input ms-0 me-3"
                type="checkbox"
                role="switch"
                id="product.id"
                v-model="product.is_enabled"
                :true-value="1"
                :false-value="0"
                @change="updateProduct(product)"
              />
              <label
                class="form-check-label"
                for="product.id"
                :class="{
                  'text-success': product.is_enabled,
                  'text-danger': !product.is_enabled,
                }"
                >{{ product.is_enabled ? "上架" : "下架" }}</label
              >
            </div>
          </td>
          <td>
            <div class="btn-group-sm">
              <button type="button" class="btn btn-outline-primary me-2" @click="openModal('edit', product)">編輯</button>
              <button type="button" class="btn btn-outline-danger" :disabled="product.is_enabled" @click="openModal('productDelete', product)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- AdminProductModal -->
    <AdminProductModal ref="productModal" :temp-product="tempProduct" :is_new="isNew"
    @get-products="getProducts"></AdminProductModal>
    <!-- AdminDelModal -->
    <AdminDelModal ref="delModal" :del-modal-status="delModalStatus" :temp-product="tempProduct"
    @get-products="getProducts"></AdminDelModal>
    <!-- Pagination -->
    <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import AdminProductModal from '@/components/AdminProductModal.vue'
import AdminDelModal from '@/components/AdminDelModal.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        imagesUrl: []
        // is_recommend: ''
      },
      isNew: true,
      delModalStatus: ''
    }
  },
  components: {
    Pagination,
    AdminProductModal,
    AdminDelModal
  },
  methods: {
    getProducts (category = '', page = 1) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}&category=${category}`
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          // this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateProduct (item) {
      this.isNew = false
      this.tempProduct = { ...item }
      // 判斷是否有 imagesUrl 陣列，沒有得先加上
      if (this.tempProduct.imagesUrl === undefined) {
        this.tempProduct.imagesUrl = []
      }
      this.$refs.productModal.updateProduct(item.id)
    },
    openModal (modalStatus, item) {
      if (modalStatus === 'new') {
        // 新增 - 清空選取產品內資料
        this.tempProduct = {
          imagesUrl: []
          // is_recommend: ''
        }

        this.$refs.productModal.openProductModal()
        this.isNew = true
      } else if (modalStatus === 'edit') {
        // 編輯 - 拷貝點選的產品
        this.tempProduct = { ...item }

        // 先判斷是否有 imagesUrl 陣列，沒有得先加上
        if (this.tempProduct.imagesUrl === undefined) {
          this.tempProduct.imagesUrl = []
        }
        this.$refs.productModal.openProductModal()
        this.isNew = false
      } else if (modalStatus === 'productDelete') {
        // 刪除 - 拷貝點選的產品
        this.tempProduct = { ...item }

        this.delModalStatus = modalStatus
        this.$refs.delModal.openDelModal()
      }
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
