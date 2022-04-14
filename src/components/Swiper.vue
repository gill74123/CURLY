<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="15"
    :loop="true"
    :autoplay="{ delay: 2500, disableOnInteraction: false }"
    :breakpoints="swiperOption"
  >
    <template v-for="product in filterProducts" :key="product.id">
      <swiper-slide>
        <a href="#" class="swiper-img d-block d-flex justify-content-center align-items-center
            rounded-3 mb-4" :style="{ backgroundImage: `url(${product.imageUrl})`}"
            @click.prevent="seeProduct(product.id)">
          <div class="bg-light bg-opacity-25 text-center p-2">
            <span class="text-white fs-4 fw-medium">{{ product.title }}</span>
          </div>
        </a>
      </swiper-slide>
    </template>
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { Autoplay } from 'swiper'
// Import Swiper styles
import 'swiper/swiper.scss'

export default {
  props: ['filter-products'],
  data () {
    return {
      modules: [Autoplay],
      swiperOption: {
        768: {
          slidesPerView: 2
        },
        992: {
          slidesPerView: 3
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    seeProduct (productId) {
      this.$router.push(`/product/${productId}`)

      // 執行 父層取得單一產品
      this.$emit('get-product', productId)
    }
  }
}
</script>
