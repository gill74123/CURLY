<template>
  <!-- Loading -->
  <Loading v-model:active="isLoading" />

  <div class="px-6 py-3">
    <div class="d-flex justify-content-end align-items-center my-4">
      <button
        type="button"
        class="btn btn-primary d-flex align-items-center px-3 py-2"
        @click="openModal('new')"
      >
        <span class="material-icons-outlined me-2">add_circle_outline</span>
        <span>新增優惠券</span>
      </button>
    </div>
    <table class="table table-borderless mb-4">
      <thead class="border-bottom border-primary text-light">
        <tr class="fw-medium">
          <th scope="col" width="300">優惠券標題</th>
          <th scope="col" width="300">優惠碼</th>
          <th scope="col" width="150">折扣</th>
          <th scope="col" width="200">截止日</th>
          <th scope="col" width="200">啟用狀態</th>
          <th scope="col" width="200">編輯 / 刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-bottom align-middle" v-for="coupon in coupons" :key="coupon.id">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.code }}</td>
          <td>{{ coupon.percent }} %</td>
          <td>{{ coupon.deadline }}</td>
          <td>
            <div class="form-check form-switch p-0">
              <input
                class="form-check-input ms-0 me-3"
                type="checkbox"
                role="switch"
                id="coupon.id"
                v-model="coupon.is_enabled"
                :true-value="1"
                :false-value="0"
                @change="updateProduct(coupon)">
              <label
                class="form-check-label"
                for="coupon.id"
                :class="{
                  'text-success': coupon.is_enabled,
                  'text-danger': !coupon.is_enabled,
                }"
                >{{ coupon.is_enabled ? "啟用" : "關閉" }}
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group-sm">
              <button type="button" class="btn btn-outline-primary me-2" @click="openModal('edit', coupon)">編輯</button>
              <button type="button" class="btn btn-outline-danger" :disabled="coupon.is_enabled" @click="openModal('couponDelete', coupon)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- AdminCouponModal -->
    <AdminCouponModal ref="couponModal" :temp-coupon="tempCoupon" :is_new="isNew"
      @get-coupons="getCoupons" />
    <!-- AdminDelModal -->
    <AdminDelModal ref="delModal" :del-modal-status="delModalStatus" :temp-coupon="tempCoupon"
      @get-coupons="getCoupons" />
    <!-- Pagination -->
    <Pagination :pages="pagination" @emit-pages="getCoupons" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import AdminCouponModal from '@/components/AdminCouponModal.vue'
import AdminDelModal from '@/components/AdminDelModal.vue'

export default {
  data () {
    return {
      coupons: {},
      pagination: {},
      tempCoupon: {},
      isNew: true,
      delModalStatus: '',
      isLoading: false
    }
  },
  components: {
    Pagination,
    AdminCouponModal,
    AdminDelModal
  },
  methods: {
    getCoupons (page = 1) {
      this.isLoading = true

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http
        .get(url)
        .then((res) => {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination

          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    updateProduct (item) {
      this.isNew = false
      this.tempCoupon = { ...item }
      this.$refs.couponModal.updateCoupon(item.id)
    },
    openModal (modalStatus, item) {
      if (modalStatus === 'new') { // 新增 - 清空選取產品內資料
        this.tempCoupon = {
          is_enabled: 0
        }
        this.isNew = true
        this.$refs.couponModal.openModal()
      } else if (modalStatus === 'edit') { // 編輯 - 拷貝點選的優惠券
        this.tempCoupon = { ...item }
        this.isNew = false
        this.$refs.couponModal.openModal()
      } else if (modalStatus === 'couponDelete') { // 刪除
        this.tempCoupon = { ...item }
        this.delModalStatus = modalStatus
        this.$refs.delModal.openModal()
      }
    }
  },
  watch: {
    coupons () {
      this.coupons.forEach(item => {
        // 將時間格式改為 YYYY-MM-DD
        item.deadline = new Date(item.due_date * 1000).toISOString().split('T')[0]
      })
    }
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
