<template>
  <div class="toast-container position-fixed end-0 p-2">
    <div v-for="(msg, index) in messages" :key="index"
      class="toast show" role="alert">
      <div class="toast-body d-flex align-items-center text-white rounded bg-opacity-75"
        :class="`bg-${msg.style}`">
        <span v-if="msg.style === 'success'" class="material-icons-outlined me-3">check_circle_outline</span>
        <span v-else class="material-icons-outlined me-2">error_outline</span>
        <p class="fs-3 me-auto">{{ msg.title }}</p>
        <button
          type="button"
          class="btn-close btn-close-white"
          @click="removeToast(index)"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messages: []
    }
  },
  methods: {
    showToast () {
      setTimeout(() => {
        this.messages.shift()
      }, 3000)
    },
    removeToast (index) {
      this.messages.splice(index, 1)
    }
  },
  mounted () {
    // 跨元件監聽 push-message 事件
    this.$emitter.on('push-message', (message) => {
      const { style, title } = message
      this.messages.push({ style, title })
      this.showToast()
    })
  }
}
</script>

<style lang="scss">
.toast-container{
  z-index: 10000;
  top: 64px;
}
</style>
