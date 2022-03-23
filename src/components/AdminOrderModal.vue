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
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <ul class="list-unstyled ms-2">
                <li>姓名：{{ tempOrder?.user?.name }}</li>
                <li>信箱：{{ tempOrder?.user?.email }}</li>
                <li>電話：{{ tempOrder?.user?.tel }}</li>
                <li>地址：{{ tempOrder?.user?.address }}</li>
                <li>備註：{{ tempOrder.message }}</li>
              </ul>
              <h3>訂單詳情</h3>
              <ul class="list-unstyled ms-2">
                <li>訂單編號：{{ tempOrder?.id }}</li>
                <li>下單時間：{{ tempOrder?.create_at }}</li>
                <li>付款時間：</li>
                <li>付款狀態：
                  <strong v-if="tempOrder.is_paid" class="text-success">已付款</strong>
                  <span v-else>尚未付款</span>
                </li>
                <li>總金額：NT$ {{ tempOrder?.total }}</li>
              </ul>
            </div>
            <div class="col-md-8">
              <h3>購買品項</h3>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">NO.</th>
                    <th scope="col">商品名稱</th>
                    <th scope="col">數量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, key, index) in tempOrder.products" :key="key">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ product.product.title}}</td>
                    <td>{{ product.product.num}}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="closeOrderModal"
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
      orderModal: ''
    }
  },
  methods: {
    // 開啟 modal
    openOrderModal () {
      this.orderModal.show()
    },
    // 關閉 modal
    closeOrderModal () {
      this.orderModal.hide()
    }
  },
  mounted () {
    this.orderModal = new Modal(this.$refs.orderModal, { keyboard: false })
  }
}
</script>
