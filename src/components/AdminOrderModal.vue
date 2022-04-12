<template>
  <div
    id="orderModal"
    ref="modal"
    class="modal fade"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary">
          <h5 id="orderModalLabel" class="modal-title text-white">
            <span>訂單編號：{{ tempOrder.id }}</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-between align-items-baseline bg-secondary p-2 mb-3">
            <h5>訂單狀態：
              <span class="fw-bold me-3" :class="{'text-success': tempOrder.is_paid, 'text-danger': !tempOrder.is_paid, 'border-success': tempOrder.is_paid, 'border-danger': !tempOrder.is_paid}">
              {{ tempOrder.is_paid ? '已付款' : '未付款' }}
              </span>
              <span v-if="tempOrder.is_paid" class="text-light fs-2">{{ tempOrder.paidDate }}</span>
            </h5>
            <p class="text-light">最後更新時間：{{ tempOrder.finalUpdateTime }}</p>
          </div>
          <div class="row">
            <div class="col-md-5">
                <div class="mb-3">
                    <h3>訂購資訊</h3>
                </div>
                <ul class="list-unstyled ms-2">
                  <li class="d-flex justify-content-between align-items-center mb-2">
                    建立時間：
                    <input type="text" class="form-control w-75 py-1" readonly v-model="tempOrder.create_at">
                  </li>
                  <li class="d-flex justify-content-between align-items-center mb-2">
                      姓名：
                      <input type="text" class="form-control w-75 py-1" v-model="tempOrder.user.name">
                  </li>
                  <li class="d-flex justify-content-between align-items-center mb-2">
                      信箱：
                      <input type="text" class="form-control w-75 py-1" v-model="tempOrder.user.email">
                  </li>
                   <li class="d-flex justify-content-between align-items-center mb-2">
                      電話：
                      <input type="text" class="form-control w-75 py-1" v-model="tempOrder.user.tel">
                  </li>
                  <li class="d-flex justify-content-between align-items-center mb-2">
                      地址：
                      <input type="text" class="form-control w-75 py-1" v-model="tempOrder.user.address">
                  </li>
                  <li class="d-flex justify-content-between align-items-start mb-2">
                      備註：
                      <textarea type="text" class="form-control w-75" id="message" name="留言" v-model="tempOrder.message">
                      </textarea>
                  </li>
                </ul>
            </div>
            <div class="col-md-7">
              <h3 class="mb-2">購買商品</h3>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" width="60">NO.</th>
                    <th scope="col" width="250">商品名稱</th>
                    <th scope="col" width="100">數量</th>
                    <th scope="col" width="120">金額</th>
                    <th scope="col">刪除</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, key, index) in tempOrder.products" :key="key" class="align-middle">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ product.product.title}}</td>
                    <td>
                        <input type="number" class="form-control text-center" v-model="product.qty" @change="updateTotal">
                    </td>
                    <td>NT$ {{ product.final_total }}</td>
                    <td>
                        <button type="button" class="btn py-0">
                            <span class="material-icons align-middle">delete_outline</span>
                        </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-end">
                <p v-if="coupon" class="fw-medium text-primary">優惠碼：{{ coupon }}</p>
                <p class="fw-medium">訂單總金額：<span class="text-danger fs-4 fw-bold">NT$ {{ tempOrder.total }}</span></p>
                <small class="text-light fs-1">(不滿 NT$ 1000 會加運費 NT$ 60)</small>
              </div>
            </div>
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
            @click="updateOrder(tempOrder.id)"
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
  props: ['temp-order'],
  data () {
    return {
      coupon: ''
    }
  },
  mixins: [modalMixin],
  methods: {
    updateOrder (orderId) {
      // Vue 在更新 DOM 的時候是非同步的，導致 OrderModal 拿到的 props 資料與父元件不一致
      // 使用 nextTick() 當 DOM 更新後才執行
      this.$nextTick(() => {
        // 將時間格式從 YYYY-MM-DD 轉換成 Unix 格式
        // Math.floor() 取小於數值的最大整數
        this.tempOrder.create_at = Math.floor(new Date(this.tempOrder.create_at) / 1000)

        // 最後更新時間
        const updateDate = new Date(new Date().getTime())
        this.tempOrder.finalUpdateTime = `${updateDate.getFullYear()}-${(updateDate.getMonth() + 1)}-${updateDate.getDate()} ${updateDate.getHours()}:${updateDate.getMinutes()}:${updateDate.getSeconds()}`

        const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/order/${orderId}`
        this.$http
          .put(url, { data: this.tempOrder })
          .then((res) => {
            this.$httpMessageState(res, '更新訂單')
            // 關閉 Modal
            this.hideModal()

            // 執行 取得產品列表，此方法在外層所以要用 emit
            this.$emit('get-orders')
          })
          .catch((err) => {
            this.$httpMessageState(err.response, '更新訂單')
          })
      })
    },
    updateTotal () {
      const productsArray = Object.keys(this.tempOrder.products)
      let total = 0
      productsArray.forEach((item) => {
        this.tempOrder.products[item].total = this.tempOrder.products[item].qty * this.tempOrder.products[item].product.price
        this.tempOrder.products[item].final_total = this.tempOrder.products[item].total * (this.tempOrder.products[item].coupon.percent / 100)
        total += this.tempOrder.products[item].final_total
      })
      this.tempOrder.total = total
    }
  },
  watch: {
    tempOrder () {
      const productsArray = Object.keys(this.tempOrder.products)
      productsArray.forEach((item) => {
        if (this.tempOrder.products[item].coupon) {
          this.coupon = this.tempOrder.products[item].coupon.title
        } else {
          this.coupon = ''
        }
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.tempOrder.paid_date) {
        // 拼出日期 & 時間 YYYY-MM-DD hh:mm:ss
        const date = new Date(this.tempOrder.paid_date * 1000)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        this.tempOrder.paidDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      }
    })
  }
}
</script>
