<template>
  <nav class="navbar navbar-expand-lg navbar-light sticky-top border-bottom">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand order-1 me-auto">CURLY</router-link>
      <button
        class="navbar-toggler order-3 order-lg-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse order-3 order-lg-2" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link text-center mx-2">產品管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link text-center mx-2">訂單管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupons" class="nav-link text-center mx-2">優惠券管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/articles" class="nav-link text-center mx-2">貼文管理</router-link>
          </li>
          <li class="nav-item d-lg-none">
            <router-link to="/login" class="nav-link text-center mx-2">
              <span class="material-icons-outlined align-middle">logout</span>
              登出
            </router-link>
          </li>
        </ul>

        <!-- 登出 -->
        <button class="d-none d-lg-block btn d-flex align-items-center btn-outline-secondary order-2 order-lg-3" type="button" @click="logout">
          <span class="material-icons-outlined align-middle me-1">logout</span>
          登出
        </button>
      </div>

    </div>
  </nav>
  <!-- <div class="container-fluid py-4 px-4">
    <nav class="row min-vh-100">
      <div class="col-md-2 border">
        <h1>CURLY</h1>
        <ul class="navbar-nav list-unstyled me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link border-bottom">產品管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link border-bottom">訂單管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupons" class="nav-link border-bottom">優惠券管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/articles" class="nav-link border-bottom">貼文管理</router-link>
          </li>
        </ul>
      </div>
      <div class="col-md-10"></div>
    </nav>
  </div> -->
</template>

<script>
export default {
  methods: {
    logout () {
      const url = `${process.env.VUE_APP_URL}/logout`
      this.$http.post(url)
        .then((res) => {
          // 頁面跳轉
          this.$router.push('/login')
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  }
}
</script>
