<template>
    <div>
        <a href="#" :id="selector" class="filter-icon" @click="showFilter" :class="{ active: filters.includes(col.prop) }">
            <font-awesome-icon icon="filter" v-if="col.filterable" />
        </a>
    </div>
</template>

<script>
// import $ from "jquery";
export default {
  props: {
    col: Object,
    filters: Array
  },
  data: function() {
    return {
      text: "Filter",
      selector: 'popover' + this._uid,
      pop: null
    };
  },
  methods: {
    showFilter() {
      this.pop = $('#' + this.selector).popover({
        content: this.text
      });

     this.pop.popover("show");
    }
  },
  mounted: function() {
    console.log($);
  }
};
</script>

<style>
</style>
