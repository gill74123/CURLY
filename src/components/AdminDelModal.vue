<template>
  <div
    id="delModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header text-white bg-danger">
          <h5 id="delModalLabel" class="modal-title">
            <span v-if="delModalStatus === 'productDelete'">刪除產品</span>
            <span v-else-if="delModalStatus === 'orderDelete' || delModalStatus === 'orderAllDelete'">刪除訂單</span>
            <span v-if="delModalStatus === 'couponDelete'">刪除優惠券</span>
            <span v-if="delModalStatus === 'articleDelete'">刪除貼文</span>
            <span v-if="delModalStatus === 'cartAllDelete'">刪除全部購物車</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close">
          </button>
        </div>
        <!-- 產品 -->
        <div class="modal-body text-start" v-if="delModalStatus === 'productDelete'">
          是否刪除
          <strong class="text-danger">{{ tempProduct.title }}</strong> 產品(刪除後將無法恢復)。
        </div>
        <!-- 單一訂單 -->
        <div class="modal-body text-start" v-else-if="delModalStatus === 'orderDelete'">
          是否刪除
          <strong class="text-danger">{{ tempOrder.id }}</strong> 訂單(刪除後將無法恢復)。
        </div>
        <!-- 全部訂單 -->
        <div class="modal-body text-start" v-else-if="delModalStatus === 'orderAllDelete'">
          是否刪除
          <strong class="text-danger">全部</strong> 訂單(刪除後將無法恢復)。
        </div>
        <!-- 優惠券 -->
        <div class="modal-body text-start" v-else-if="delModalStatus === 'couponDelete'">
          是否刪除
          <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
        </div>
        <!-- 貼文 -->
        <div class="modal-body text-start" v-else-if="delModalStatus === 'articleDelete'">
          是否刪除
          <strong class="text-danger">{{ tempArticle.title }}</strong> 貼文(刪除後將無法恢復)。
        </div>
        <!-- 前台購物車 -->
        <div class="modal-body text-start" v-else-if="delModalStatus === 'cartAllDelete'">
          是否刪除
          <strong class="text-danger">全部</strong> 購物車產品(刪除後將無法恢復)。
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
            class="btn btn-danger"
            v-if="delModalStatus === 'productDelete'"
            @click="delProduct(tempProduct.id)">
            刪除產品
          </button>
          <button
            type="button"
            class="btn btn-danger"
            v-if="delModalStatus === 'orderDelete' || delModalStatus === 'orderAllDelete'"
            @click="delOrder(delModalStatus, tempOrder.id)">
            刪除訂單
          </button>
          <button
            type="button"
            class="btn btn-danger"
            v-if="delModalStatus === 'couponDelete'"
            @click="delCoupon(tempCoupon.id)">
            刪除優惠券
          </button>
          <button
            type="button"
            class="btn btn-danger"
            v-if="delModalStatus === 'articleDelete'"
            @click="delArticle(tempArticle.id)">
            刪除貼文
          </button>
          <button
            type="button"
            class="btn btn-danger"
            v-if="delModalStatus === 'cartAllDelete'"
            @click="delCarts()">
            刪除全部購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: [
    'del-modal-status',
    'temp-product',
    'temp-order',
    'temp-coupon',
    'temp-article'
  ],
  mixins: [modalMixin],
  methods: {
    delProduct (productId) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/product/${productId}`

      this.$http
        .delete(url)
        .then((res) => {
          this.$httpMessageState(res, '刪除產品')
          this.hideModal()

          // 執行 父層取得產品列表
          this.$emit('get-products')
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '刪除產品')
        })
    },
    delOrder (modalStatus, orderId) {
      let url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/order/${orderId}`
      let messageStatus = '刪除訂單'

      if (modalStatus === 'orderAllDelete') {
        url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/orders/all`
        messageStatus = '刪除全部訂單'
      }

      this.$http
        .delete(url)
        .then((res) => {
          this.$httpMessageState(res, messageStatus)
          this.hideModal()

          // 執行 父層取得訂單列表
          this.$emit('get-orders')
        })
        .catch((err) => {
          this.$httpMessageState(err.response, messageStatus)
        })
    },
    delCoupon (couponId) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/coupon/${couponId}`

      this.$http
        .delete(url)
        .then((res) => {
          this.$httpMessageState(res, '刪除優惠券')
          this.hideModal()

          // 執行 父層取得優惠券列表
          this.$emit('get-coupons')
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '刪除優惠券')
        })
    },
    delArticle (articleId) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/article/${articleId}`

      this.$http.delete(url)
        .then((res) => {
          this.$httpMessageState(res, '刪除貼文')
          this.hideModal()

          // 執行 父層取得貼文列表
          this.$emit('get-articles')
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '刪除貼文')
        })
    },
    // 前台購物車 清空全部購物車
    delCarts () {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/carts`
      this.$http
        .delete(url)
        .then((res) => {
          this.$httpMessageState(res, '刪除全部購物車產品')
          this.hideModal()

          // 執行 父層取得產品列表
          this.$emit('get-carts')
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '刪除全部購物車產品')
        })
    }
  }
}
</script>
