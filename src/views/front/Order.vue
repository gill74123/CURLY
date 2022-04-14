<template>
    <!-- Loading -->
    <Loading v-model:active="isLoading"></Loading>

    <div class="order container py-6">
        <!-- Timeline -->
        <Timeline />

        <div class="row g-5">
            <div class="col-md-6 mb-4">
              <div class="d-flex border-bottom pb-2 mb-5">
                <h5 class="text-primary fw-bold">購物車詳情</h5>
              </div>
                <div class="card mb-2" v-for="cartItem in cartData.carts" :key="cartItem.id">
                    <div class="row g-0">
                      <div class="col-3">
                        <img class="card-img img-fluid rounded-start"
                          :src="cartItem.product.imageUrl" :alt="cartItem.product.title"
                          >
                      </div>
                      <div class="col-6 text-dark">
                        <div class="card-body d-flex flex-column justify-content-between h-100 py-0">
                          <h5 class="card-title fw-medium m-0">{{ cartItem.product.title }}</h5>
                          <p class="card-text ">x {{ cartItem.qty }}</p>
                        </div>
                      </div>
                      <div class="col-3 align-self-center">
                        <p class="card-text">NT$ {{ cartItem.total }}</p>
                      </div>
                    </div>
                </div>
                <hr>
                <div class="input-group mb-4">
                    <input type="text" class="form-control" placeholder="輸入優惠代碼" v-model.trim="couponCode">
                    <button class="btn btn-outline-primary" type="button" :disabled="isSpinner || couponCode === ''"
                      @click="addCoupon(couponCode)">
                      <div v-if="isSpinner" class="spinner-border spinner-border-sm me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      套用優惠券
                    </button>
                </div>
                <!-- `cartData.total !== cartData.final_total` 避免使用者重新整理 -->
                <div v-if="is_Discount || cartData.total !== cartData.final_total">
                  <p class="text-danger mb-2">{{ couponData.message }}</p>
                  <p class="d-flex justify-content-between text-light mb-2">
                    折抵購物金
                    <span>-NT$ {{ cartData.total - cartData.final_total }}</span>
                  </p>
                  <p v-if="cartData.final_total < 1000" class="d-flex justify-content-between text-light mb-2">
                    運費
                    <span>+NT$ 60</span>
                  </p>
                  <p class="d-flex justify-content-between fw-medium fs-4">
                    總金額
                    <span v-if="cartData.final_total < 1000">NT$ {{ cartData.final_total + 60 }}</span>
                    <span v-else>NT$ {{ cartData.final_total }}</span>
                  </p>
                </div>
                <div v-else>
                  <p class="d-flex justify-content-between fw-medium fs-4">
                    總金額
                    <span v-if="cartData.final_total < 1000">NT$ {{ cartData.total + 60 }}</span>
                    <span v-else>NT$ {{ cartData.total }}</span>
                  </p>
                </div>
            </div>
            <div class="col-md-6">
                <h5 class="border-bottom text-primary fw-bold pb-2 mb-2">訂購人資訊</h5>
                <Form class="py-3" v-slot="{ errors }" @submit="addOrder">
                    <div class="mb-3">
                        <label for="Email" class="form-label"><span class="text-danger">*</span> Email</label>
                        <Field type="email" class="form-control" id="Email" name="Email" placeholder="請輸入 Email"
                        v-model="formData.user.email" :class="{ 'is-invalid': errors['Email'] }" rules="email|required"></Field>
                        <error-message name="Email" class="invalid-feedback"></error-message>
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label"><span class="text-danger">*</span> 收件人</label>
                        <Field type="text" class="form-control" id="name" name="收件人" placeholder="請輸入姓名"
                          v-model="formData.user.name" :class="{ 'is-invalid': errors['收件人'] }" rules="required"></Field>
                        <error-message name="收件人" class="invalid-feedback"></error-message>
                    </div>
                    <div class="mb-3">
                        <label for="tel" class="form-label"><span class="text-danger">*</span> 電話</label>
                        <Field type="tel" class="form-control" id="tel" name="電話" placeholder="請輸入電話"
                          v-model="formData.user.tel" :class="{ 'is-invalid': errors['電話'] }" :rules="isPhone"></Field>
                        <error-message name="電話" class="invalid-feedback"></error-message>
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label"><span class="text-danger">*</span> 收件地址</label>
                        <Field type="text" class="form-control" id="address" name="收件地址" placeholder="請輸入收件地址"
                          v-model="formData.user.address" :class="{ 'is-invalid': errors['收件地址'] }" rules="required"></Field>
                        <error-message name="收件地址" class="invalid-feedback"></error-message>
                    </div>
                    <div class="mb-4">
                        <label for="message" class="form-label">留言</label>
                        <Field type="text" class="form-control" id="message" name="留言" cols="30" rows="10"
                          v-model="formData.message" as="textarea"></Field>
                    </div>
                    <div class="text-end">
                        <button type="submit" class="btn btn-primary w-100 w-lg-25 p-2"
                          :disabled="isSpinner">送出訂單</button>
                    </div>
                </Form>
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
      },
      isLoading: false,
      isSpinner: false
    }
  },
  components: {
    Timeline
  },
  methods: {
    addCoupon (couponCode) {
      this.isSpinner = true

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

          this.$httpMessageState(res, '使用優惠券')
          this.isSpinner = false
        })
        .catch((err) => {
          this.$httpMessageState('errMessage', err.response.data.message)
          this.isSpinner = false
        })
    },
    addOrder () {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/order`
      const data = this.formData
      this.$http
        .post(url, { data })
        .then((res) => {
          this.is_Discount = true
          // 跨元件去呼叫 getCart
          this.$emitter.emit('get-cart')

          this.formData = {
            user: {}
          }

          this.$httpMessageState(res, '訂單建立')
          const orderId = res.data.orderId
          this.$router.push(`/pay/${orderId}`)
        })
        .catch((err) => {
          this.$httpMessageState('errMessage', err.response.data.message)
        })
    },
    isPhone (value) {
      if (value === undefined) {
        return '電話 為必填'
      }
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '須為正確的電話號碼'
    }
  },
  watch: {
    is_Discount () {
      // 跨元件去呼叫 getCart
      this.$emitter.emit('get-cart')

      // 跨元件取得購物車的資訊
      this.$emitter.on('get-cart-data', (cartData) => {
        this.cartData = cartData
        this.isLoading = false
      })
    }
  },
  mounted () {
    this.isLoading = true

    // 跨元件去呼叫 getCart
    this.$emitter.emit('get-cart')

    // 跨元件取得購物車的資訊
    this.$emitter.on('get-cart-data', (cartData) => {
      this.cartData = cartData
      this.isLoading = false
    })
  }
}
</script>
