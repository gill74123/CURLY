<template>
  <nav class="navbar navbar-expand-lg navbar-light sticky-top border-bottom">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand order-1 text-logo text-secondary fs-4 fw-medium  me-auto pe-4">CURLY</RouterLink>
      <button
        class="navbar-toggler order-3 order-lg-2" type="button"
        @click="toggleCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse order-3 order-lg-2" ref="collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/admin/products" class="nav-link text-center mx-2" @click="closeCollapse">產品管理</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/orders" class="nav-link text-center mx-2" @click="closeCollapse">訂單管理</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/coupons" class="nav-link text-center mx-2" @click="closeCollapse">優惠券管理</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/articles" class="nav-link text-center mx-2" @click="closeCollapse">貼文管理</RouterLink>
          </li>
          <li class="nav-item d-lg-none">
            <RouterLink to="/login" class="nav-link text-center mx-2" @click="logout">
              <span class="material-icons-outlined align-middle">logout</span>
              登出
            </RouterLink>
          </li>
        </ul>

        <button class="d-none d-lg-block btn d-flex align-items-center btn-outline-secondary order-2 order-lg-3" type="button" @click="logout">
          <span class="material-icons-outlined align-middle me-1">logout</span>
          登出
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import collapseToggle from '@/mixins/collapseToggle.js'

export default {
  mixins: [collapseToggle],
  methods: {
    logout () {
      const url = `${process.env.VUE_APP_URL}/logout`
      this.$http.post(url)
        .then((res) => {
          this.$router.push('/login')
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    }
  }
}
</script>
