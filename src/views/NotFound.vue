<template>
  <div class="d-flex bg-secondary text-center text-primary min-vh-100 p-6">
    <div class="d-flex flex-column justify-content-center align-items-center
      border border-2 border-primary w-100">
      <div class="d-flex justify-content-center align-items-center mb-3">
        <span class="fs-8">4</span>
        <img class="mx-3" src="@/assets/images/logo.png" alt="logoImage">
        <span class="fs-8">4</span>
      </div>
      <div class="mb-6">
        <h1>OOPS！</h1>
        <p>您訪問的頁面不存在哦</p>
      </div>
      <div>
        <RouterLink to="/" class="btn btn-outline-primary px-4 me-3">前往首頁</RouterLink>
        <RouterLink to="/products" class="btn btn-outline-primary px-4">前往商店</RouterLink>
      </div>
    </div>
  </div>
</template>
