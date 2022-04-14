export default {
  data () {
    return {
      favorite: JSON.parse(localStorage.getItem('favorite')) || []
    }
  },
  methods: {
    toggleFavorite (productId) {
      // 查詢 this.favorite 有沒有這個 productId
      const favoriteIndex = this.favorite.findIndex((item) => {
        return item === productId
      })
      if (favoriteIndex === -1) {
        this.favorite.push(productId)
        this.$httpMessageState(true, '加入收藏')
      } else {
        this.favorite.splice(favoriteIndex, 1)
        this.$httpMessageState(true, '移除收藏')
      }

      // 每當觸發 toggleFavorite 方法時，傳遞 this.favorite 資料到 FrontNavbar.vue
      this.$emitter.emit('toggle-favorite', this.favorite)
    }
  },
  watch: {
    // 因 this.favorite 為陣列，所以要做深層的監聽
    favorite: {
      handler () {
        // localStorage 資料寫入
        localStorage.setItem('favorite', JSON.stringify(this.favorite))
      },
      deep: true
    }
  }
}
