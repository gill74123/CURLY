<template>
  <div
    id="orderModal"
    ref="orderModal"
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
            class="btn-close"
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
            <p class="text-light">最後更新時間：{{ finalUpdateTime }}</p>
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
                      <!-- {{ tempOrder?.user?.name }} -->
                  </li>
                  <li class="d-flex justify-content-between align-items-center mb-2">
                      信箱：
                      <input type="text" class="form-control w-75 py-1" v-model="tempOrder.user.email">
                      <!-- {{ tempOrder?.user?.email }} -->
                  </li>
                   <li class="d-flex justify-content-between align-items-center mb-2">
                      電話：
                      <input type="text" class="form-control w-75 py-1" v-model="tempOrder.user.tel">
                      <!-- {{ tempOrder?.user?.tel }} -->
                  </li>
                  <li class="d-flex justify-content-between align-items-center mb-2">
                      地址：
                      <input type="text" class="form-control w-75 py-1" v-model="tempOrder.user.address">
                      <!-- {{ tempOrder?.user?.address }} -->
                  </li>
                  <li class="d-flex justify-content-between align-items-start mb-2">
                      備註：
                      <textarea type="text" class="form-control w-75" id="message" name="留言" v-model="tempOrder.message">
                      </textarea>
                      <!-- <input type="text" class="form-control w-75 py-1" v-model="tempOrder.message"> -->
                      <!-- {{ tempOrder.message }} -->
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
                        <input type="number" class="form-control text-center" v-model="product.qty">
                        <!-- product.qty -->
                    </td>
                    <td>NT$ {{ product.final_total }}</td>
                    <!-- {{ product.final_total }}  productTotal-->
                    <td>
                        <button type="button" class="btn py-0">
                            <span class="material-icons align-middle">delete_outline</span>
                        </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p class="fw-medium text-end text-primary">優惠碼：xxxxxxxx</p>
              <p class="fw-medium text-end">訂單總金額：<span class="text-danger fs-4 fw-bold">NT$ {{ tempOrder.total }}</span></p>
              <!-- {{ tempOrder.total }}orderTotal -->
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
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: ['temp-order'],
  data () {
    return {
      orderModal: '',
      finalUpdateTime: ''
    }
  },
  methods: {
    updateOrder (orderId) {
      // Vue 在更新 DOM 的時候是非同步的，導致 OrderModal 拿到的 props 資料與父元件不一致
      // 使用 nextTick() 當 DOM 更新後才執行
      this.$nextTick(() => {
        // 將時間格式從 YYYY-MM-DD 轉換成 Unix 格式
        // Math.floor() 取小於數值的最大整數
        this.tempOrder.create_at = Math.floor(new Date(this.tempOrder.create_at) / 1000)
        const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/order/${orderId}`
        this.$http
          .put(url, { data: this.tempOrder })
          .then((res) => {
            // 關閉 Modal
            this.closeOrderModal()

            // 執行 取得產品列表，此方法在外層所以要用 emit
            this.$emit('get-orders')
          })
          .catch((err) => {
            console.dir(err.response)
          })

        // 最後更新時間
        const updateDate = new Date(new Date().getTime())
        this.finalUpdateTime = `${updateDate.getFullYear()}-${(updateDate.getMonth() + 1)}-${updateDate.getDate()} ${updateDate.getHours()}:${updateDate.getMinutes()}:${updateDate.getSeconds()}`
      })
    },
    // 開啟 modal
    openOrderModal () {
      this.$nextTick(() => {
        if (this.tempOrder.paid_date) {
          // 拼出日期 & 時間
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

      this.orderModal.show()
    },
    // 關閉 modal
    closeOrderModal () {
      this.orderModal.hide()
    }
  },
  // watch: {
  //   tempOrder () {
  //     // console.log(1)
  //     const productsArray = Object.keys(this.tempOrder.products)
  //     // this.tempOrder.total = 0
  //     productsArray.forEach(item => {
  //       // this.productQty = this.tempOrder.products[item].qty
  //       // console.log(this.tempOrder.products[item])
  //       // console.log(this.tempOrder.products[item].final_total)
  //       // this.tempOrder.products[item].final_total = this.tempOrder.products[item].product.price * this.tempOrder.products[item].qty * (this.tempOrder.products[item].coupon.percent * 0.01)
  //       // console.log(console.log(this.tempOrder.products[item].final_total))
  //       // this.tempOrder.total += this.tempOrder.products[item].final_total
  //     })
  //   }
  // },
  mounted () {
    this.orderModal = new Modal(this.$refs.orderModal, { keyboard: false })
  }
}
</script>
