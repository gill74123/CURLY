<template>
  <div
    class="modal fade"
    ref="modal"
    tabindex="-1"
    aria-labelledby="couponAlertModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-secondary border border-primary border-5">
        <div class="modal-header border-0 justify-content-center pb-0">
          <h5 class="modal-title fw-bold fs-4">— CURLY 全新開幕 —</h5>
          <!-- <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close">
          </button> -->
        </div>
        <div class="modal-body">
          <div class="img-couponAlert d-flex flex-column justify-content-center align-items-center text-white">
            <span class="bg-light bg-opacity-25 text-center fs-4 fw-bold p-3 py-4 mb-3">
              歡慶 CURLY 盛大開幕<br>
              全館結帳不限金額，立即享 8 折優惠！
            </span>
            <button type="button" class="btn btn-primary py-2 px-5" @click="copyCoupon">複製優惠碼</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  mixins: [modalMixin],
  methods: {
    copyCoupon () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText('CURLY20%off')
        this.$httpMessageState(true, '複製優惠券')
      }
      this.hideModal()
    }
  },
  mounted () {
  }
}
</script>
