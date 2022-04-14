<template>
    <div class="login">
      <div class="container h-100">
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-md-6 text-center">
            <h1>登入頁面</h1>
          <form class="form-signin p-4">
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="username" placeholder="name@example.com" required autofocus
                v-model="user.username" @keyup.enter="login">
              <label for="username">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" class="form-control" id="password" placeholder="Password" required
                v-model="user.password" @keyup.enter="login">
              <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="button" @click="login">
              登入
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>

    <!-- AdminFooter -->
    <AdminFooter />
</template>

<script>
import AdminFooter from '@/components/AdminFooter.vue'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    AdminFooter
  },
  methods: {
    login () {
      const url = `${process.env.VUE_APP_URL}/admin/signin`
      this.$http
        .post(url, this.user)
        .then((res) => {
          const { token, expired } = res.data
          // 將 token, expired 存到 cookie
          document.cookie = `gillToken=${token}; expires=${new Date(expired)}; path=/`

          this.$router.push('/admin/products')
        })
        .catch((err) => {
          this.$httpMessageState('errMessage', err.response.data.message)
        })
    }
  }
}
</script>
