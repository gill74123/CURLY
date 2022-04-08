<template>
    <div class="row g-0 justify-content-between mb-4">
            <div class="col-4 image-box d-flex justify-content-center align-items-center position-relative">
              <span v-if="tempProduct.productImage.length === 0" class="material-icons-outlined fs-6 text-gray">image</span>
              <template v-else>
                <img :src="tempProduct.productImage[0]" alt="" class="image-product">
                <a href="" class="text-light" @click.prevent="delImage(0)">
                  <span class="material-icons-outlined position-absolute top-0 start-100 translate-middle removeCircle">remove_circle_outline</span>
                </a>
                <a href="" class="image-main position-absolute bottom-0 start-0 end-0 bg-secondary text-center p-1"
                  :class="tempProduct.imageUrl === tempProduct.productImage[0] ? 'active' : ''" @click.prevent="mainImage(0)">
                  設為主圖片
                </a>
              </template>
            </div>
            <div class="col-4 image-box d-flex justify-content-center align-items-center position-relative">
              <span v-if="tempProduct.productImage.length < 2" class="material-icons-outlined fs-6 text-gray">image</span>
              <template v-else>
                <img :src="tempProduct.productImage[1]" alt="" class="image-product">
                <a href="" class="text-light" @click.prevent="delImage(1)">
                  <span class="material-icons-outlined position-absolute top-0 start-100 translate-middle removeCircle">remove_circle_outline</span>
                </a>
                <a href="" class="image-main position-absolute bottom-0 start-0 end-0 bg-secondary text-center p-1"
                  :class="tempProduct.imageUrl === tempProduct.productImage[1] ? 'active' : ''" @click.prevent="mainImage(1)">
                  設為主圖片
                </a>
              </template>
            </div>
            <div class="col-4 image-box d-flex justify-content-center align-items-center position-relative">
              <span v-if="tempProduct.productImage.length < 3" class="material-icons-outlined fs-6 text-gray">image</span>
              <template v-else>
                <img :src="tempProduct.productImage[2]" alt="" class="image-product">
                <a href="" class="text-light" @click.prevent="delImage(2)">
                  <span class="material-icons-outlined position-absolute top-0 start-100 translate-middle removeCircle">remove_circle_outline</span>
                </a>
                <a href="" class="image-main position-absolute bottom-0 start-0 end-0 bg-secondary text-center p-1"
                  :class="tempProduct.imageUrl === tempProduct.productImage[2] ? 'active' : ''" @click.prevent="mainImage(2)">
                  設為主圖片
                </a>
              </template>
            </div>
            <div class="col-4 image-box d-flex justify-content-center align-items-center position-relative">
              <span v-if="tempProduct.productImage.length < 4" class="material-icons-outlined fs-6 text-gray">image</span>
              <template v-else>
                <img :src="tempProduct.productImage[3]" alt="" class="image-product">
                <a href="" class="text-light" @click.prevent="delImage(3)">
                  <span class="material-icons-outlined position-absolute top-0 start-100 translate-middle removeCircle">remove_circle_outline</span>
                </a>
                <a href="" class="image-main position-absolute bottom-0 start-0 end-0 bg-secondary text-center p-1"
                  :class="tempProduct.imageUrl === tempProduct.productImage[3] ? 'active' : ''" @click.prevent="mainImage(3)">
                  設為主圖片
                </a>
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <label for="imageUrl" class="form-label">輸入圖片網址</label>
              <div class="input-group mb-3">
                <input type="text" class="imageInput form-control bg-white" placeholder="請輸入圖片連結" ref="imageUrl"/>
                <button type="button" class="btn btn-outline-light" @click="imageUpload('imageUrl')">
                  上傳圖片
                </button>
              </div>
              <label for="imageUrl" class="form-label">上傳檔案</label>
              <div class="input-group">
                <input type="file" class="imageInput form-control bg-white" id="fileInput" ref="fileInput"/>
                <button type="button" class="btn btn-outline-light" @click="imageUpload('imageFile')">
                  上傳圖片
                </button>
              </div>
            </div>
            <div class="col-8">
              <div class="mb-3">
                <label for="title" class="form-label"><span class="text-danger me-1">*</span>商品名稱</label>
                <input id="title" type="text" class="form-control bg-white" placeholder="請輸入標題"
                v-model="tempProduct.title" required/>
              </div>
              <!-- 分類 / 內容量 / 單位 -->
              <div class="row mb-3">
                <div class="col-4">
                  <label for="category" class="form-label"><span class="text-danger me-1">*</span>分類</label>
                  <input id="category" type="text" class="form-control bg-white" placeholder="請輸入分類"
                    v-model="tempProduct.category"/>
                </div>
                <div class="col-4">
                  <label for="grams" class="form-label"><span class="text-danger me-1">*</span>內容量</label>
                  <input id="grams" type="text" class="form-control bg-white" placeholder="請輸入幾內容量"
                    v-model="tempProduct.grams"/>
                </div>
                <div class="col-4">
                  <label for="unit" class="form-label"><span class="text-danger me-1">*</span>單位</label>
                  <input id="unit" type="text" class="form-control bg-white" placeholder="請輸入單位"
                    v-model="tempProduct.unit"/>
                </div>
              </div>
              <!-- 原價 / 售價 -->
              <div class="row mb-3">
                <div class="col-6">
                  <label for="origin_price" class="form-label"><span class="text-danger me-1">*</span>原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control bg-white" placeholder="請輸入原價"
                    v-model="tempProduct.origin_price"/>
                </div>
                <div class="col-6">
                  <label for="price" class="form-label"><span class="text-danger me-1">*</span>售價</label>
                  <input id="price" type="number" min="0" class="form-control bg-white" placeholder="請輸入售價"
                    v-model="tempProduct.price"/>
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control bg-white" placeholder="請輸入產品描述"
                v-model="tempProduct.description">
                </textarea>
              </div>
              <!-- 商品成分 / 過敏源 -->
              <div class="row mb-4">
                <div class="col-6">
                  <label for="content" class="form-label">商品成分</label>
                  <textarea id="content" type="text" class="form-control bg-white" placeholder="請輸入商品成分"
                    v-model="tempProduct.content">
                  </textarea>
                </div>
                <div class="col-6">
                  <label for="notice" class="form-label">過敏源</label>
                  <textarea id="notice" type="text" class="form-control bg-white" placeholder="請輸入商品過敏源"
                    v-model="tempProduct.notice">
                  </textarea>
                </div>
              </div>
              <!-- 是否啟用 / 店長推薦 -->
              <div class="d-flex">
                <div class="form-check me-3">
                  <input id="is_enabled" class="form-check-input" type="checkbox"
                  v-model="tempProduct.is_enabled" :true-value="1" :false-value="0"/>
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
                <div class="form-check">
                  <input id="is_recommend" class="form-check-input  text-dark" type="checkbox"
                  v-model="tempProduct.is_recommend" :true-value="1" :false-value="0"/>
                  <label class="form-check-label" for="is_recommend">店長推薦</label>
                </div>
              </div>
            </div>
          </div>
</template>
