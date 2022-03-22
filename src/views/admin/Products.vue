<template>
  <div class="px-6 py-3">
    <!-- <h2>產品列表</h2> -->
    <div class="d-flex justify-content-end align-items-center my-4">
      <button
        class="btn btn-primary d-flex align-items-center text-end px-4"
        @click="openModal('new')"
      >
        <span class="material-icons-outlined me-2">add_circle_outline</span>
        <span>新增產品</span>
      </button>
    </div>
    <table class="table table-borderless">
      <thead class="border-bottom border-primary text-light">
        <tr class="">
          <th scope="col" width="150" class="fw-medium">分類</th>
          <th scope="col"  class="text-start fw-medium">商品名稱</th>
          <th scope="col" class="fw-medium">原價</th>
          <th scope="col" class="fw-medium">售價</th>
          <th scope="col" width="180" class="fw-medium">是否推薦</th>
          <th scope="col" width="180" class="fw-medium">啟用狀態</th>
          <th scope="col" width="150" class="fw-medium">編輯 / 刪除</th>
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
                >{{ product.is_enabled ? "上架" : "未上架" }}</label
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      pagination: {}
    }
  },
  methods: {
    getProducts (page = 1) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/products?${page}`
      this.$http
        .get(url)
        .then((res) => {
          console.log(res)
          this.products = res.data.products
          this.pagination = res.data.pagination
          // this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
