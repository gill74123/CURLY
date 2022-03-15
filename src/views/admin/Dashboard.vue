<template>
  <h1>後台</h1>
  <router-link to="/admin/products" class="menuLink">產品管理</router-link> |
  <router-link to="/admin/orders" class="menuLink">訂單管理</router-link> |
  <router-link to="/admin/coupons" class="menuLink">優惠券管理</router-link> |
  <router-link to="/admin/articles" class="menuLink">貼文管理</router-link>
  <router-view></router-view>
</template>
