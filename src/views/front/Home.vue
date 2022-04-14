<template>
  <div class="front min-vh-100">
    <FrontNavbar />
    <RouterView />
    <FrontFooter />
  </div>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import FrontFooter from '@/components/FrontFooter.vue'

export default {
  components: {
    FrontNavbar,
    FrontFooter
  }
}
</script>
