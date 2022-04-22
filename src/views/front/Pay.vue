<template>
  <!-- Loading -->
  <Loading v-model:active="isLoading" />

  <div class="pay container py-6 py-md-7">
    <!-- Timeline -->
    <Timeline :order="order"></Timeline>

    <div class="row justify-content-center py-6 py-md-7">
      <div class="col-lg-8 bg-white py-5 px-2 px-lg-3">
        <template v-if="!order.is_paid">
          <h2 class="border-bottom text-center pb-3 mb-4">訂單資訊</h2>
          <div  class="d-flex flex-column align-items-center">
            <button class="d-flex justify-content-between btn btn-primary rounded-0 text-start fw-medium w-100" type="button"
              @click="toggleCollapse">
              商品資訊
              <span class="material-icons-outlined">expand_more</span>
            </button>
            <div class="collapse show w-100" ref="collapse">
            <div class="card rounded-0" v-for="productItem in order.products" :key="productItem">
              <div class="row gx-3 align-items-center">
                <div class="col-3">
                  <img class="card-img img-fluid rounded-0"
                    :src="productItem.product.imageUrl" :alt="productItem.product.title">
                </div>
                <div class="col-6 text-dark">
                  <div class="card-body d-flex align-items-center p-0">
                    <h5 class="me-2">{{ productItem.product.title }}</h5>
                    <p class="card-text ">x {{ productItem.qty }}</p>
                  </div>
                </div>
                <div class="col-3 align-self-center">
                  <p class="card-text fw-medium">NT$ {{ productItem.total }}</p>
                </div>
              </div>
            </div>
            </div>

            <table class="table table-hover text-dark w-100 my-5">
              <tbody>
                <tr>
                  <td width="120" class="text-align-justify">訂單編號：</td>
                  <td>
                    <span id="orderId">{{ order.id }}</span>
                    <a href="#" @click.prevent="copyToClipBoard()">
                      <span class="material-icons-outlined fs-3 ms-2">content_copy</span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td width="120" class="text-align-justify">姓名：</td>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <td width="120" class="text-align-justify">手機：</td>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <td width="120" class="text-align-justify">Email：</td>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <td width="120" class="text-align-justify">收件地址：</td>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                  <td width="120" class="text-align-justify">備註：</td>
                  <td>{{ order.message }}</td>
                </tr>
                <tr>
                  <td width="120" class="text-align-justify">訂單金額：</td>
                  <td v-if="order.total < 1000" class="text-danger fw-bold">NT$ {{ order.total }} ({{ order.is_paid ? '已付款' : '未付款'}})</td>
                  <td v-else class="text-danger fw-bold">NT$ {{ order.total }} ({{ order.is_paid ? '已付款' : '未付款'}})</td>
                </tr>
              </tbody>
            </table>
            <button type="button" class="btn btn-primary w-100 py-2" @click="toPay">確認付款</button>
          </div>
        </template>

        <div v-else class="text-center">
          <h2 class="d-flex flex-column mb-3">
            <span class="material-icons-outlined text-success fs-6 mb-2">task_alt</span>
            訂單支付完成
          </h2>
          <div class="fs-3 text-light mb-4">
            <h5 class="mb-2">— 感謝您的訂購 —</h5>
            <p>
              商品預計於七個工作天內寄送
              <br />
              再請留意簡訊通知
            </p>
          </div>
          <RouterLink to="/products" class="btn btn-primary px-5 py-2">繼續選購</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Timeline from '@/components/Timeline.vue'
import collapseToggle from '@/mixins/collapseToggle.js'

export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: '',
      isLoading: false
    }
  },
  components: {
    Timeline
  },
  mixins: [collapseToggle],
  methods: {
    getOrder () {
      this.isLoading = true
      const { id } = this.$route.params
      this.orderId = id
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/order/${id}`
      this.$http
        .get(url)
        .then((res) => {
          this.order = res.data.order

          if (this.order.total < 1000) {
            this.order.total = this.order.total + 60
          }
          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    toPay () {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http
        .post(url)
        .then((res) => {
          this.getOrder()
          this.$httpMessageState(res, '付款')
        })
        .catch((err) => {
          this.$httpMessageState('errMessage', err.response.data.message)
        })
    },
    copyToClipBoard () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.orderId)
        this.$httpMessageState(true, '訂單編號複製')
      }
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
