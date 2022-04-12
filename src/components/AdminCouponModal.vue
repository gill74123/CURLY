<template>
  <div
    id="couponModal"
    ref="modal"
    class="modal fade"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 id="couponModalLabel" class="modal-title">{{ is_new ? '新增優惠券' : '編輯優惠券' }}</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row gy-3">
              <div class="col-md-6">
                <label for="title" class="form-label"><span class="text-danger me-1">*</span>優惠券名稱</label>
                <input id="title" type="text" class="form-control" placeholder="輸入優惠券名稱"
                v-model="tempCoupon.title"
                />
              </div>
              <div class="col-md-6">
                <label for="code" class="form-label"><span class="text-danger me-1">*</span>優惠碼</label>
                <input id="code" type="text" class="form-control" placeholder="輸入優惠碼"
                v-model="tempCoupon.code"
                />
              </div>
              <div class="col-md-6">
                <label for="percent" class="form-label"><span class="text-danger me-1">*</span>折扣（%）</label>
                <input id="percent" type="number" max="100" min="1" class="form-control" placeholder="輸入折扣"
                v-model="tempCoupon.percent"
                />
              </div>
              <div class="col-md-6">
                <label for="dueDate" class="form-label"><span class="text-danger me-1">*</span>截止日</label>
                <input id="dueDate" type="date" class="form-control"
                v-model="due_date"/>
                <!--  出來的格式為 YYYY-MM-DD -->
              </div>
          </div>
          <hr>
          <div class="form-check me-3">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempCoupon.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-light"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="updateCoupon(tempCoupon.id)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: ['temp-coupon', 'is_new'],
  data () {
    return {
      due_date: ''
    }
  },
  mixins: [modalMixin],
  methods: {
    updateCoupon (couponId) {
      // Vue 在更新 DOM 的時候是非同步的，導致 CouponModal 拿到的 props 資料與父元件不一致
      // 所以使用 nextTick() 當 DOM 更新後才執行
      this.$nextTick(() => {
        let url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/coupon/${couponId}`
        let httpMethod = 'put'
        let messageStatus = '更新優惠券'

        if (this.is_new) {
          url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/coupon`
          httpMethod = 'post'
          messageStatus = '新增優惠券'
        }
        this.$http[httpMethod](url, { data: this.tempCoupon })
          .then((res) => {
            this.$httpMessageState(res, messageStatus)
            // 關閉 Modal
            this.hideModal()

            // 執行 取得產品列表
            this.$emit('get-coupons')// 此方法在外層所以要用 emit
          })
          .catch((err) => {
            this.$httpMessageState(err.response, messageStatus)
          })
      })
    }
  },
  watch: {
    tempCoupon () {
      // 將時間格式改為 YYYY-MM-DD
      if (this.tempCoupon.due_date !== undefined) {
        this.due_date = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T')[0]
      }
    },
    due_date () {
      // 將時間格式從 YYYY-MM-DD 轉換成 Unix 格式
      // Math.floor() 取小於數值的最大整數
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.is_new) {
        this.due_date = ''
      }
    })
  }
}
</script>
