<template>
  <!-- Loading -->
  <Loading v-model:active="isLoading" />

  <section class="about bg-banner position-relative mt-6">
    <h2
      class="
        position-absolute
        bg-light bg-opacity-25
        text-white text-center
        top-50
        start-50
        translate-middle
        w-75
        w-lg-50
        p-3 py-4" data-aos="fade-up" data-aos-offset="0"
    >
      <p class="fs-4 fs-md-5 fw-bold">我們填滿的不是你的肚子，而是您的心情</p>
    </h2>
  </section>

  <section class="container py-6 py-md-7">
    <div class="row align-items-center mb-7" data-aos="fade-right">
      <div class="col-md-6">
        <h4 class="text-primary">/ 關於 CURLY /</h4>
        <div class="text-light p-3">
          「CURLY」是一間肉桂捲專賣店，<br />
          一提到肉桂捲大家心中對它一定都會有著差不多的樣子就是「捲」，<br />
          加上老闆從小到大頂著一頭超級自然捲髮，所以 CURLY 名字的由來就這樣誕生了。
          <br />
          <br />
          充實的工作日之餘，從容的來上一個肉桂捲，<br />
          享受著閒暇療癒的時光，讓 CURLY 填滿你的肚子更填滿你的心。
        </div>
      </div>
      <div class="col-md-6">
        <div class="aboutCartImg-1"></div>
      </div>
    </div>
    <div class="row align-items-center mb-7" data-aos="fade-left">
      <div class="col-md-6">
        <div class="aboutCartImg-2"></div>
      </div>
      <div class="col-md-6">
        <h4 class="text-primary">/ 堅持手作 /</h4>
        <div class="text-light p-3">
          當大家都在追求快速生產時，<br />
          CURLY 選擇「放慢」腳步、堅持手作，等待一個一個獨一無二的肉桂捲出爐。
          <br />
          <br />
          以專業的技術、成熟的經驗，每日現烤出充滿生命力的產品，<br />
          讓你吃下去的不只是麵包，更是充滿溫度的手藝。
        </div>
      </div>
    </div>
    <div class="row align-items-center mb-7" data-aos="fade-right">
      <div class="col-md-6">
        <h4 class="text-primary">/ 傳播美味 /</h4>
        <div class="text-light p-3">
          肉桂並非大眾口味，<br />
          在這都會的角落，會有個追隨大眾主流的慣性，而 CURLY 立志將小眾的美味傳播出去。
          <br />
          <br />
          讓大家都可以在 CURLY 找到屬於自己的味道，一起品味你的無可取代。
        </div>
      </div>
      <div class="col-md-6">
        <div class="aboutCartImg-3"></div>
      </div>
    </div>
    <div class="text-center">
      <RouterLink to="/products"
        class="btn btn-outline-primary rounded-2 py-2 px-7">
        前往購物
      </RouterLink>
    </div>
    <!-- <button>屬於你獨一無二的味道</button> -->

    <!-- <div class="mb-3" data-aos="fade-up">
      <h4 class="text-primary">/ 關於 CURLY /</h4>
      <div class="text-light p-3">
        「CURLY」是一間肉桂捲專賣店，<br />
        一提到肉桂捲大家心中對它一定都會有著差不多的樣子就是「捲」，<br />
        加上老闆從小到大頂著一頭超級自然捲髮，所以 CURLY 名字的由來就這樣誕生了。
        <br />
        <br />
        充實的工作日之餘，從容的來上一個肉桂捲，<br />
        享受著閒暇療癒的時光，讓 CURLY 填滿你的肚子更填滿你的心。
      </div>
    </div>
    <div class="mb-3" data-aos="fade-up">
      <h4 class="text-primary">/ 堅持手做 /</h4>
      <div class="text-light p-3">
        當大家都在追求快速生產時，<br />
        CURLY 選擇「放慢」腳步、堅持手做，等待一個一個獨一無二的肉桂捲出爐。
        <br />
        <br />
        以專業的技術、成熟的經驗，每日現烤出充滿生命力的產品，<br />
        您吃下去的不只是麵包，也是充滿溫度的手藝。
      </div>
    </div>
    <div data-aos="fade-up">
      <h4 class="text-primary">/ 傳播美味 /</h4>
      <div class="text-light p-3">
        肉桂並非大眾的味道，<br />
        在這都會的轉角，會有個追隨大眾主流的慣性，而 CURLY 立志將小眾的美味傳播出去。
        <br />
        <br />
        讓大家都可以在此找到屬於你的味道，一起品味你的無可取代。
      </div>
    </div> -->
  </section>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  mounted () {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }
}
</script>
