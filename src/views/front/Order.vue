<template>
    <div class="order container py-6">
        <!-- timeline -->
        <Timeline></Timeline>
        <!-- <ul class="timeline d-flex justify-content-center list-unstyled mb-6">
            <li class="timeline-item active">
                <p class="timeline-pointer">1</p>
                訂單確認
            </li>
            <li class="timeline-item">
                <p class="timeline-pointer">2</p>
                訂單建立
            </li>
            <li class="timeline-item">
                <p class="timeline-pointer">3</p>
                完成訂單
            </li>
        </ul> -->
        <div class="row g-5">
            <!-- 購物車詳情 -->
            <div class="col-md-6 mb-4">
                <h5 class="border-bottom text-primary fw-bold pb-2 mb-5">購物車詳情</h5>
                <div class="card mb-3" v-for="cartItem in cartData.carts" :key="cartItem.id">
                    <div class="row g-0">
                      <div class="col-3">
                        <img class="card-img img-fluid rounded-start" alt="cartItem.product.title"
                        :src="cartItem.product.imageUrl">
                      </div>
                      <div class="col-6 text-dark">
                        <div class="card-body d-flex flex-column justify-content-between h-100 py-0">
                          <h5 class="card-title fw-medium m-0">{{ cartItem.product.title }}</h5>
                          <p class="card-text ">x {{ cartItem.qty }}</p>
                        </div>
                      </div>
                      <div class="col-3 align-self-center">
                        <p class="card-text ">NT$ {{ cartItem.total }}</p>
                      </div>
                    </div>
                </div>
                <hr>
                <div class="input-group mb-4">
                    <input type="text" class="form-control" placeholder="輸入優惠代碼" v-model.trim="couponCode">
                    <button class="btn btn-outline-primary" type="button" @click="addCoupon(couponCode)">套用優惠券</button>
                </div>
                <!-- `cartData.total !== cartData.final_total` 避免使用者重新整理 -->
                <div v-if="is_Discount || cartData.total !== cartData.final_total">
                  <p class="d-flex justify-content-between text-light mb-2">
                    折抵購物金
                    <span>-NT$ {{ cartData.total - cartData.final_total }}</span>
                  </p>
                  <p class="d-flex justify-content-between fw-medium fs-4">
                    總金額
                    <span>NT$ {{ cartData.final_total }}</span>
                  </p>
                </div>
                <div v-else>
                  <p class="d-flex justify-content-between fw-medium fs-4">
                    總金額
                    <span>NT$ {{ cartData.total }}</span>
                  </p>
                </div>
            </div>
            <div class="col-md-6">
                <h5 class="border-bottom text-primary fw-bold pb-2 mb-2">訂購人資訊</h5>
                <form class="py-3" ref="resetForm">
                    <div class="mb-3">
                        <label for="Email1" class="form-label"><span class="text-danger">*</span> Email</label>
                        <input type="email" class="form-control" id="Email1" name="Email" placeholder="請輸入 Email"
                        v-model="formData.user.email">
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label"><span class="text-danger">*</span> 收件人</label>
                        <input type="text" class="form-control" id="name" name="收件人" placeholder="請輸入姓名"
                        v-model="formData.user.name">
                    </div>
                    <div class="mb-3">
                        <label for="tel" class="form-label"><span class="text-danger">*</span> 電話</label>
                        <input type="tel" class="form-control" id="tel" name="電話" placeholder="請輸入電話"
                        v-model="formData.user.tel">
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label"><span class="text-danger">*</span> 收件地址</label>
                        <input type="text" class="form-control" id="address" name="收件地址" placeholder="請輸入收件地址"
                        v-model="formData.user.address">
                    </div>
                    <div class="mb-4">
                        <label for="message" class="form-label">留言</label>
                        <textarea type="text" class="form-control" id="message" name="留言" cols="30" rows="10"
                        v-model="formData.message"></textarea>
                    </div>
                    <div class="text-end">
                        <button type="button" class="btn btn-primary w-100 w-lg-25 p-2" @click="addOrder">送出訂單</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Timeline from '@/components/Timeline.vue'

export default {
  data () {
    return {
      cartData: {
        carts: []
      },
      couponData: {
        data: {}
      },
      couponCode: '',
      is_Discount: false,
      formData: {
        user: {}
      }
    }
  },
  components: {
    Timeline
  },
  methods: {
    addCoupon (couponCode) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/coupon`
      const data = {
        code: couponCode
      }
      this.$http
        .post(url, { data })
        .then((res) => {
          this.couponData = res.data
          this.is_Discount = true
          this.couponCode = ''
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addOrder () {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/order`
      const data = this.formData
      this.$http
        .post(url, { data })
        .then((res) => {
          console.log(res)
          this.is_Discount = true
          // 跨元件去呼叫 getCart
          this.$emitter.emit('get-cart')
          // 清空列表
          this.formData = {
            user: {}
          }
          // this.$refs.resetForm.resetForm()
          // 換頁
          const orderId = res.data.orderId
          this.$router.push(`/pay/${orderId}`)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  watch: {
    is_Discount () {
      // 跨元件去呼叫 getCart
      this.$emitter.emit('get-cart')

      // 跨元件取得購物車的資訊
      this.$emitter.on('get-cart-data', (cartData) => {
        this.cartData = cartData
      })
    }
  },
  mounted () {
    // 跨元件去呼叫 getCart
    this.$emitter.emit('get-cart')

    // 跨元件取得購物車的資訊
    this.$emitter.on('get-cart-data', (cartData) => {
      this.cartData = cartData
    })
  }
}
</script>
