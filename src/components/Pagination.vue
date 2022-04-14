<template>
  <nav class="d-flex justify-content-end align-items-center" aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{disabled: !pages.has_pre}">
          <a href="#" class="page-link" aria-label="Previous" @click.prevent="updatePage(pages.category, pages.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pages.total_pages" :key="page + 'page'" :class="{active: page === pages.current_page}">
          <a href="#" class="page-link" @click.prevent="updatePage(pages.category, page)">{{ page }}</a>
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
    updatePage (category, page) {
      this.$emit('emit-pages', category, page)
    }
  }
}
</script>
