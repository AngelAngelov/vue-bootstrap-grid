<template>
  <thead class="thead-light">
    <tr>
      <th v-if="rowNumbers"></th>
      <th
        class="text-left"
        v-for="(col, index) in cols"
        :key="index"
        :class="{ active: sortKey == col.prop }"
      >
        <a href="#!" @click="sortBy(col.prop)" v-if="col.sortable">
          {{
            (typeof col.title == "function" ? col.title() : col.title)
              | capitalize
          }}
          <font-awesome-icon icon="sort" v-if="sortKey !== col.prop" />
          <font-awesome-icon
            icon="sort-up"
            v-if="sortKey == col.prop && sortDirection === 1"
          />
          <font-awesome-icon
            icon="sort-down"
            v-if="sortKey == col.prop && sortDirection === -1"
          />
        </a>
        <span v-else>{{ col.title | capitalize }}</span>
        <span class="float-right pointer" v-if="col.filterable">
          <grid-filter
            :col="col"
            @change="applyFilter"
            @clear="clearFilter"
          ></grid-filter>
        </span>
      </th>
    </tr>
  </thead>
</template>

<script>
import filters from "../models/filters";
import Filter from "./filter.vue";

export default {
  name: "GridHeader",
  components: {
    "grid-filter": Filter,
  },
  props: {
    cols: {
      type: Array,
      required: true,
    },
    sortKey: {
      type: String,
      required: true,
    },
    rowNumbers: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      sortkey: '',
      sortDirection: null
    };
  },
  methods: {
    applyFilter(val) {
      this.$emit("apply-filter", val);
    },
    clearFilter(val) {
      this.$emit("clear-filter", val);
    },
    sortBy(val) {
      this.sortkey = val;
      this.sortDirection = (this.sortDirection || 1) * -1;
      this.$emit("sort", {key: val, direction: this.sortDirection});
    },
  },
  filters: {
    ...filters,
  }
};
</script>

<style scoped>
th a {
  color: inherit;
}

th.active a {
  color: #007bff; /* bootstrap theme link color */
}

a.active {
  color: #007bff; /* bootstrap theme link color */
}

.pointer {
  cursor: pointer;
}

.filter-icon {
  float: right;
}
</style>