<template>
  <div class="front min-vh-100">
    <FrontNavbar></FrontNavbar>
    <router-view></router-view>
  </div>
  <!-- header/footer -->
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'

export default {
  components: {
    FrontNavbar
  }
}
</script>
