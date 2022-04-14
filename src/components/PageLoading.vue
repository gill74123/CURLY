<template>
  <Loading>
    <img class="loading-img" src="@/assets/images/cinnamon.png" alt="pageLoadingIcon">
    <span class="text-light fs-4 fw-bold mt-3">—— L O D I N G ——</span>
  </Loading>
</template>

<script>
// vue-loading-overlay
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Loading
  }
}
</script>
