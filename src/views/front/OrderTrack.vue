<template>
  <!-- vue-loading-overlay -->
  <Loading v-model:active="isLoading"></Loading>

  <!-- banner -->
  <section class="orderTrack bg-banner position-relative">
    <h2
      class="
        position-absolute
        bg-light bg-opacity-25
        text-white text-center
        top-50
        start-50
        translate-middle
        p-3
        px-4
      "
    >
      <p>看看你的捲捲訂單</p>
    </h2>
  </section>

  <section class="container p-6">
    <div class="row justify-content-center mb-5 py-3">
      <div class="col-md-6">
        <h3 class="text-center text-primary mb-3">請輸入您的訂單編號</h3>
        <div class="input-group mb-3">
          <span class="input-group-text bg-primary border-primary">
            <span class="material-icons-outlined text-white">search</span>
          </span>
          <input type="search" class="form-control border-primary p-2" placeholder="搜尋訂單編號"
            v-model.trim="orderId"/>
          <button type="button" class="btn btn-primary" @click="getOrder(orderId)">搜尋</button>
        </div>
      </div>
    </div>
    <div v-show="isSearch" class="row justify-content-center">
      <div class="col-md-8">
        <button class="btn btn-primary d-flex justify-content-between rounded-0 w-100" type="button"
          @click="toggleCollapse">
          <h5 class="fw-medium">訂單編號：{{ order.id }}</h5>
          <span class="material-icons-outlined">expand_more</span>
        </button>
        <div class="collapse show border border-primary py-2 px-5" ref="collapse">
          <table class="table table-borderless text-dark w-100">
            <tbody>
              <tr>
                <td class="fw-medium fs-3" width="150">訂購時間：</td>
                <td>{{ order?.create_at }}</td>
              </tr>
              <tr>
                <td class="fw-medium fs-3" width="150">姓名：</td>
                <td>{{ order?.user?.name }}</td>
              </tr>
              <tr>
                <td class="fw-medium fs-3" width="150">手機：</td>
                <td>{{ order?.user?.tel }}</td>
              </tr>
              <tr>
                <td class="fw-medium fs-3" width="150">Email：</td>
                <td>{{ order?.user?.email }}</td>
              </tr>
              <tr>
                <td class="fw-medium fs-3" width="150">收件地址：</td>
                <td>{{ order?.user?.address }}</td>
              </tr>
              <tr>
                <td class="fw-medium fs-3" width="150">備註：</td>
                <td>{{ order?.message }}</td>
              </tr>
              <tr>
                <td class="fw-medium fs-3" width="150">訂單金額：</td>
                <td class="fw-bold" :class="{'text-danger': !order.is_paid, 'text-success': order.is_paid}">
                  $NT {{ order?.total }} ({{ order.is_paid ? '已付款' : '未付款'}})
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
          console.log(err)
        })
    }
  }
}
</script>
