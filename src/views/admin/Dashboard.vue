<template>
  <div class="admin min-vh-100">
    <AdminNavbar></AdminNavbar>
    <router-view v-if="checkSuccess"></router-view>
    <AdminFooter></AdminFooter>
  </div>
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
            this.checkSuccess = true
          })
          .catch((err) => {
            console.log(err.response)
            alert(err.response.data.message)

            // 頁面跳轉
            this.$router.push('/login')
          })
      } else {
        alert('您尚未登入，請登入！')
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
