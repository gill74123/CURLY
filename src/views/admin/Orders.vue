<template>
  <!-- vue-loading-overlay -->
  <Loading v-model:active="isLoading"></Loading>

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
          <th scope="col" width="130">購買時間</th>
          <th scope="col" class="text-start" width="250">訂單編號</th>
          <th scope="col" width="300">Email</th>
          <th scope="col" width="300">購買品項</th>
          <th scope="col" width="150">應付金額</th>
          <th scope="col" width="150">訂單狀態</th>
          <th scope="col" width="150">編輯 / 刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-bottom align-middle" v-for="order in orders" :key="order.id">
          <td>{{ order.create_at }}</td>
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
              :disabled="order.is_paid"
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
    <AdminOrderModal ref="orderModal" :orders="orders" :temp-order="tempOrder" @get-orders="getOrders"></AdminOrderModal>
    <!-- AdminDelModal -->
    <AdminDelModal ref="delModal" :del-modal-status="delModalStatus" :temp-order="tempOrder"
    @get-orders="getOrders"></AdminDelModal>
    <!-- Pagination -->
    <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import AdminOrderModal from '@/components/AdminOrderModal.vue'
import AdminDelModal from '@/components/AdminDelModal.vue'

export default {
  data () {
    return {
      orders: {},
      pagination: {},
      tempOrder: {
        user: {}
      },
      delModalStatus: '',
      isLoading: false
    }
  },
  components: {
    Pagination,
    AdminOrderModal,
    AdminDelModal
  },
  methods: {
    getOrders (category, page = 1) {
      this.isLoading = true

      // query 參數用?帶入網址
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http.get(url)
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination

          this.addFreight()

          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    updateOrder (item) {
      this.tempOrder = { ...item }
      this.$refs.orderModal.updateOrder(item.id)
    },
    openModal (modalStatus, item) {
      if (modalStatus === 'orderModal') {
        // OrderModal
        this.tempOrder = { ...item }
        this.$refs.orderModal.openModal()
      } else if (modalStatus === 'orderDelete') {
        // 刪除 - 單一訂單
        this.tempOrder = { ...item }
        this.delModalStatus = modalStatus
        this.$refs.delModal.openModal()
      } else if (modalStatus === 'orderAllDelete') {
        // 刪除 - 全部訂單
        this.delModalStatus = modalStatus
        this.$refs.delModal.openModal()
      }
    },
    addFreight () {
      this.orders.forEach((item) => {
        if (item.total < 1000) {
          item.total = item.total + 60
        }
      })
    }
  },
  watch: {
    orders () {
      this.orders.forEach(item => {
        item.create_at = new Date(item.create_at * 1000).toISOString().split('T')[0]
      })
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
