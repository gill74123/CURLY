<template>
  <nav class="d-flex justify-content-end align-items-center" aria-label="Page navigation example">
    <ul class="pagination m-0">
      <li class="page-item" :class="{disabled: !pages.has_pre}">
        <a href="#" class="page-link" aria-label="Previous" @click.prevent="updatePage(pages.category, pages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pages.total_pages" :key="page + 'page'" :class="{active: page === pages.current_page}">
        <a href="#" class="page-link" @click.prevent="updatePage(page, pages.category)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{disabled: !pages.has_next}">
        <a href="#" class="page-link" aria-label="Next" @click.prevent="updatePage(pages.category, pages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
    </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage (page, category) {
      this.$emit('emit-pages', page, category)
    }
  }
}
</script>
