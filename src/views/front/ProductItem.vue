<template>
    <section class="container mb-3">
      <div class="row g-5">
        <!-- 產品圖片 -->
        <div class="col-md-6">
          <div class="row g-2 image justify-content-between">
            <div class="col-md-12">
              <img class="mainImg" src="https://cdn01.pinkoi.com/product/aJv2E2YT/0/1/640x530.jpg" alt="">
            </div>
            <div class="col-md-4 ">
              <a href="">
                <img class="secImg" src="data:image/jpeg;base64,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" alt="">
              </a>
            </div>
            <div class="col-md-4">
              <a href="">
                <img class="secImg" src="https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/11/28/1/14646610.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=800" alt="">
              </a>
            </div>
            <div class="col-md-4">
              <a href="">
                <img class="secImg" src="https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/11/28/1/14646609.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=800" alt="">
              </a>
            </div>
          </div>
        </div>
        <!-- 產品內容 -->
        <div class="col-md-6 d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="fs-6 m-0">經典原味</h2>
              <span class="text-primary border border-primary rounded-2 py-1 px-3">店長推薦</span>
            </div>
            <p class="mb-4">
              <span class="text-primary fw-bold fs-5">$60</span> / 顆
              <del class="fs-4 text-dark ms-3">$90</del>
            </p>
            <div class="mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, consequuntur atque distinctio autem asperiores, rerum repellat consequatur cum iste deleniti blanditiis. Repudiandae eius quos tenetur commodi quod veniam officiis eaque?
            </div>
            <p class="text-primary">#肉桂捲 #不敗經典</p>
          </div>
          <hr>
          <div class="d-flex justify-content-start mb-4">
            <input type="number" min="1" class="form-control bg-secondary border-1 border-primary rounded-2 text-dark w-25 p-2 me-3">
            <button type="button" class="btn btn-primary text-white fw-4 px-6">加入購物車</button>
          </div>
        </div>
      </div>
    </section>
</template>
