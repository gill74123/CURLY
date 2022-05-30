<template>
  <div class="front min-vh-100">
    <FrontNavbar />
    <RouterView />
    <FrontFooter />
    <ScrollTop />
  </div>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
import ScrollTop from '@/components/ScrollTop.vue'

export default {
  components: {
    FrontNavbar,
    FrontFooter,
    ScrollTop
  }
}
</script>
