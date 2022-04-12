<template>
  <div class="admin min-vh-100 position-relative">
    <AdminNavbar></AdminNavbar>
    <router-view v-if="checkSuccess"></router-view>
  </div>
  <AdminFooter></AdminFooter>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
import AdminFooter from '@/components/AdminFooter.vue'

export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  components: {
    AdminNavbar,
    AdminFooter
  },
  methods: {
    checkAdmin () {
      const myToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)gillToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (myToken) {
        // 將 token 帶入 axios headers
        this.$http.defaults.headers.common.Authorization = `${myToken}`

        const url = `${process.env.VUE_APP_URL}/api/user/check`
        this.$http
          .post(url)
          .then((res) => {
            this.$httpMessageState(res, '登入')
            this.checkSuccess = true
          })
          .catch((err) => {
            this.$httpMessageState(err.response, '錯誤訊息')

            // 頁面跳轉
            this.$router.push('/login')
          })
      } else {
        this.$httpMessageState(false, '錯誤訊息')
        // 頁面跳轉
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    this.checkAdmin()
  }
}
</script>
