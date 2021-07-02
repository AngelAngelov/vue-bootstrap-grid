<template>
  <div>
    <div v-if="col.type === 'vue'">
      <component
        :is="col.template(row.items).template"
        :templateArgs="col.template(row.items).templateArgs"
      >
      </component>
    </div>
    <div v-else>
      <span v-if="col.type === 'date'">{{ row.items[col.prop] | date }}</span>
      <span v-else-if="col.type === 'html'" v-html="row.items[col.prop]"></span>

      <span v-else>{{ row.items[col.prop] }}</span>
    </div>
  </div>
</template>

<script>
import customFilters from "../models/filters";
export default {
    name: 'RowItem',
    props: {
        col: {type: Object, required: true},
        row: {type: Object, required: true}
    },
    filters: {
        ...customFilters
    }
};
</script>

<style>
</style>