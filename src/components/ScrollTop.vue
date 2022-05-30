<template>
  <a href="#" class="d-inline position-fixed top-80 end-0 bg-primary rounded-3 opacity-75 p-2 m-lg-3"
    :class="scrollYValue < 50 ? 'd-none' : ''" @click.prevent="scrollTop">
    <span class="material-icons-outlined text-secondary fs-6 fw-medium align-middle">arrow_circle_up</span>
  </a>
</template>

<script>
export default {
  data () {
    return {
      scrollYValue: ''
    }
  },
  methods: {
    scrollTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    scrollWatch () {
      this.scrollYValue = window.scrollY
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollWatch)
  }
}
</script>
