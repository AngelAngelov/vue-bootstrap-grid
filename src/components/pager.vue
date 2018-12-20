<template>
  <div>
    <nav>
      <ul class="pagination">
        <li class="page-item" v-bind:class="{disabled: currentPage === 1}">
          <a class="page-link" href="#" aria-label="First" @click="goToPage(1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">First</span>
          </a>
        </li>
        <li class="page-item" v-bind:class="{disabled: currentPage === 1}">
          <a class="page-link" href="#" aria-label="Previous" @click="goToPage(currentPage-1)">
            <span aria-hidden="true">&lt;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="(page, index) in totalPages" :key="index" v-bind:class="{active: currentPage == page}" @click="goToPage(page)">
          <a class="page-link" href="#">{{page}}</a>
        </li>
        <li class="page-item" v-bind:class="{disabled: currentPage === totalPages}">
          <a class="page-link" href="#" aria-label="Next" @click="goToPage(currentPage+1)">
            <span aria-hidden="true">&gt;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
        <li class="page-item" v-bind:class="{disabled: currentPage === totalPages}">
          <a class="page-link" href="#" aria-label="Last" @click="goToPage(totalPages)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Last</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: Number,
    initialPage: { type: Number, default: 1 }
  },
  data() {
    return {
      currentPage: null
    };
  },
  methods: {
    goToPage(pageNumber) {
      if (pageNumber === this.currentPage) {
        return;
      }

      this.currentPage = pageNumber;
      this.$emit('change', this.currentPage);
    }
  },
  mounted() {
    this.currentPage = this.initialPage;
  }
};
</script>

<style scoped>
</style>
