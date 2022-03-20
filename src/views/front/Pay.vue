<template>
  <div class="pay container py-6">
    <!-- timeline -->
    <Timeline :order="order"></Timeline>
    <!-- <ul class="timeline d-flex justify-content-center list-unstyled mb-6">
      <li class="timeline-item active">
        <p class="timeline-pointer">1</p>
        訂單確認
      </li>
      <li class="timeline-item active">
        <p class="timeline-pointer">2</p>
        訂單建立
      </li>
      <li class="timeline-item" :class="order.is_paid ? 'active' : ''">
        <p class="timeline-pointer">3</p>
        完成訂單
      </li>
    </ul> -->

    <!-- 訂單資訊 -->
    <div class="row justify-content-center">
      <div class="col-9 bg-white p-4">
        <template v-if="!order.is_paid">
          <h2 class="border-bottom text-center pb-3 mb-4">訂單資訊</h2>
        <!-- 商品資訊 -->
        <div  class="d-flex flex-column align-items-center">
          <a class="btn btn-outline-primary rounded-0 text-start w-100 w-lg-75" type="button" data-bs-toggle="collapse" data-bs-target="#productsCollapse" aria-expanded="false" aria-controls="collapseExample">
          商品資訊
          </a>
          <div class="collapse w-100 w-lg-75" id="productsCollapse">
          <div class="card border-primary rounded-0 mb-3" v-for="productItem in order.products" :key="productItem">
            <div class="row gx-3 align-items-center">
              <div class="col-3">
                <img class="card-img img-fluid rounded-0" alt="cartItem.product.title"
                :src="productItem.product.imageUrl">
              </div>
              <div class="col-5 text-dark">
                <div class="card-body d-flex align-items-center p-0">
                  <h5 class="me-2">{{ productItem.product.title }}</h5>
                  <p class="card-text ">x {{ productItem.qty }}</p>
                </div>
              </div>
              <div class="col-4 align-self-center">
                <p class="card-text fw-medium">NT$ {{ productItem.total }}</p>
              </div>
            </div>
          </div>
          </div>

          <table class="table table-hover text-dark w-100 w-lg-75 my-5">
            <tbody>
              <tr>
                <td width="150">訂單編號</td>
                <td>{{ order.id }}</td>
              </tr>
              <tr>
                <td width="150">姓名</td>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <td width="150">手機</td>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <td width="150">Email</td>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <td width="150">收件地址</td>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <td width="150">備註</td>
                <td>{{ order.message }}</td>
              </tr>
              <tr>
                <td width="150">訂單金額</td>
                <td class="text-danger fw-bold">NT$ {{ order.total }}</td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-primary w-100 w-lg-75" @click="toPay">確認付款</button>
        </div>
        </template>

        <!-- 訂單完成 -->
        <div v-else class="text-center">
          <h2 class="d-flex flex-column mb-3">
            <span class="material-icons-outlined text-success fs-6 mb-2">task_alt</span>
            訂單完成
          </h2>
          <div class="fs-3 text-light mb-4">
            <h5 class="mb-2">— 感謝您的訂購 —</h5>
            <p>商品預計於七個工作天內寄送<br>再請留意簡訊通知</p>
          </div>
          <router-link to="/products" class="btn btn-primary px-5">繼續選購</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Timeline from '@/components/Timeline.vue'

export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: ''
    }
  },
  components: {
    Timeline
  },
  methods: {
    getOrder () {
      const { id } = this.$route.params
      this.orderId = id
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/order/${id}`
      this.$http
        .get(url)
        .then((res) => {
          this.order = res.data.order
        })
        .catch((err) => {
          console.log(err)
        })
    },
    toPay () {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http
        .post(url)
        .then((res) => {
          this.getOrder()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
