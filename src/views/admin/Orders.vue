<template>
  <div class="px-6 py-3">
    <div class="d-flex justify-content-end align-items-center my-4">
      <button
        class="btn btn-outline-danger d-flex align-items-center px-3 py-2"
        @click="openModal('orderAllDelete')">
        <span class="material-icons align-middle me-2">delete</span>
        清空全部訂單
      </button>
    </div>
    <table class="table table-borderless mb-4">
      <thead class="border-bottom border-primary text-light">
        <tr>
          <th scope="col" width="200">購買時間</th>
          <th scope="col" class="text-start">訂單編號</th>
          <th scope="col">Email</th>
          <th scope="col" width="300">購買品項</th>
          <th scope="col" width="200">應付金額</th>
          <th scope="col" width="200">訂單狀態</th>
          <th scope="col" width="150">編輯 / 刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-bottom" v-for="order in orders" :key="order.id">
          <td>1</td>
          <td class="text-start">{{ order.id }}</td>
          <td>{{ order.user.email }}</td>
          <td>
            <div v-for="(product) in order.products" :key="product.id">{{ product.product.title }}</div>
          </td>
          <td>NT$ {{ order.total }}</td>
          <td>
            <div class="form-check form-switch p-0">
              <input
                class="form-check-input ms-0 me-3"
                type="checkbox"
                role="switch"
                id="order.id"
                v-model="order.is_paid"
                :true-value="true"
                :false-value="false"
                @change="updateOrder(order)"
              />
              <label
                class="form-check-label"
                for="order.id"
                :class="{
                  'text-success': order.is_paid,
                  'text-danger': !order.is_paid,
                }"
                >{{ order.is_paid ? "已付款" : "未付款" }}</label>
            </div>
          </td>
          <td>
            <div class="btn-group-sm">
            <button
              type="button"
              class="btn btn-outline-primary me-2"
              @click="openModal('orderModal', order)"
            >
              詳情
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="openModal('orderDelete', order)"
            >
              刪除
            </button>
          </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- AdminOrderModal -->
    <AdminOrderModal ref="orderModal" :temp-order="tempOrder"></AdminOrderModal>
    <!-- Pagination -->
    <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import AdminOrderModal from '@/components/AdminOrderModal.vue'

export default {
  data () {
    return {
      orders: {},
      pagination: {},
      tempOrder: {}
    }
  },
  components: {
    Pagination,
    AdminOrderModal
  },
  methods: {
    getOrders (category, page = 1) {
      // query 參數用?帶入網址
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http.get(url)
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination// 取得分頁資訊
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    openModal (modalStatus, item) {
      if (modalStatus === 'orderModal') {
        // OrderModal
        this.tempOrder = { ...item }
        this.$refs.orderModal.openOrderModal()
      } else if (modalStatus === 'orderDelete' || modalStatus === 'orderAllDelete') {
        // AlertModal
        this.tempOrder = { ...item }
        this.$refs.delAlertModal.openDelAlertModal()
        this.alertModalStatus = modalStatus
      }
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
