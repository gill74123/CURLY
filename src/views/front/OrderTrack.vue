<template>
  <!-- Loading -->
  <Loading v-model:active="isLoading" />

  <section class="orderTrack bg-banner position-relative">
    <h2
      class="
        position-absolute
        bg-light bg-opacity-25
        text-white text-center
        top-50
        start-50
        translate-middle
        w-75
        w-lg-50
        p-3 py-4" data-aos="fade-up" data-aos-offset="0"
    >
      <p class="fs-4 fs-md-5 fw-bold">看看你的捲捲訂單</p>
    </h2>
  </section>

  <section class="container py-6 py-md-7">
    <div class="row justify-content-center mb-5 py-3">
      <div class="col-md-6">
        <h3 class="text-center text-primary mb-3">請輸入您的訂單編號</h3>
        <div class="input-group mb-3">
          <span class="d-none d-lg-block input-group-text bg-primary border-primary">
            <span class="material-icons-outlined text-white">search</span>
          </span>
          <input type="search" class="form-control border-primary p-2" placeholder="搜尋訂單編號"
            v-model.trim="orderId">
          <button type="button" class="btn btn-primary px-5 px-lg-3" @click="getOrder(orderId)">搜尋</button>
        </div>
      </div>
    </div>
    <div v-show="isSearch" class="row justify-content-center">
      <div class="col-md-8">
        <button class="btn btn-primary d-flex justify-content-between align-items-center rounded-0 w-100 px-2 px-md-5" type="button"
          @click="toggleCollapse">
          <h5 class="fw-bold fs-3">訂單編號：{{ order.id }}</h5>
          <span class="material-icons-outlined">expand_more</span>
        </button>
        <div class="collapse show border border-primary py-2 px-md-5" ref="collapse">
          <table class="table table-borderless text-dark w-100">
            <tbody>
              <tr>
                <td class="fw-medium fs-3 text-align-justify" width="150">訂購時間：</td>
                <td>{{ order?.create_at }}</td>
              </tr>
              <tr>
                <td class="fw-medium fs-3 text-align-justify" width="150">姓名：</td>
                <td>{{ order?.user?.name }}</td>
              </tr>
              <tr>
                <td class="fw-medium fs-3 text-align-justify" width="150">手機：</td>
                <td>{{ order?.user?.tel }}</td>
              </tr>
              <tr>
                <td class="fw-medium fs-3 text-align-justify" width="150">Email：</td>
                <td>{{ order?.user?.email }}</td>
              </tr>
              <tr>
                <td class="fw-medium fs-3 text-align-justify" width="150">收件地址：</td>
                <td>{{ order?.user?.address }}</td>
              </tr>
              <tr>
                <td class="fw-medium fs-3 text-align-justify" width="150">備註：</td>
                <td>{{ order?.message }}</td>
              </tr>
              <tr>
                <td class="fw-medium fs-3 text-align-justify" width="150">訂單金額：</td>
                <td class="fw-bold" :class="{'text-danger': !order.is_paid, 'text-success': order.is_paid}">
                  <template v-if="order.total < 1000">$NT {{ order?.total + 60 }}</template>
                  <template v-else>$NT {{ order?.total }}</template>
                  ({{ order.is_paid ? '已付款' : '未付款'}})
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import collapseToggle from '@/mixins/collapseToggle.js'

export default {
  data () {
    return {
      order: {},
      orderId: '',
      isSearch: false,
      isLoading: false
    }
  },
  mixins: [collapseToggle],
  methods: {
    getOrder (orderId) {
      this.isLoading = true

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/order/${orderId}`
      this.$http
        .get(url)
        .then((res) => {
          this.order = res.data.order
          this.orderId = ''
          // 將時間格式改為 YYYY-MM-DD
          this.order.create_at = new Date(this.order.create_at * 1000).toISOString().split('T')[0]

          this.isSearch = true
          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '搜尋')
          this.isLoading = false
        })
    }
  }
}
</script>
