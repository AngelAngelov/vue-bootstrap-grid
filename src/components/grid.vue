<template>
  <div>
    <table class="table table-bordered table-hover">
      <grid-header
        :cols="columns"
        :sortKey="sortKey"
        :rowNumbers="rowNumbers"
        @apply-filter="applyFilter"
        @clear-filter="clearFilter"
        @sort="sortBy"
      ></grid-header>
      <tbody>
        <tr
          class="pointer"
          v-for="(row, index) in dataSource.data"
          :key="index"
          @click="onRowClick(row)"
        >
          <td v-if="rowNumbers">{{ ((currentPage - 1) * pageSize ) + index + 1 }}</td>
          <td
            v-for="(key, index) in columns"
            :key="index"
            v-bind:class="['text-' + key.textAlign]"
          >
            <row-item :col="key" :row="row"></row-item>
          </td>
        </tr>
      </tbody>
    </table>
    <pager
      v-if="paging"
      :total-pages="totalPages"
      :initial-page="currentPage"
      @change="onPageChange"
      ref="pager"
    ></pager>
  </div>
</template>

<script>
import Column from "../models/column";
import customFilters from "../models/filters";
import Filter from "./filter.vue";
import Pager from "./pager.vue";
import DataSource from "../models/data-source";
import RowItem from "./rowItem.vue";
import GridHeader from "./header.vue";

import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSort,
  faSortUp,
  faSortDown,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([faSort, faSortUp, faSortDown, faFilter]);
Vue.component("font-awesome-icon", FontAwesomeIcon);

export default {
  name: "grid",
  components: {
    "grid-filter": Filter,
    Pager,
    RowItem,
    GridHeader,
  },
  props: {
    items: Array,
    columns: Array,
    filterKey: String,
    rowNumbers: { type: Boolean, default: false },
    paging: { type: Boolean, default: false },
    pageSize: { type: Number, default: 10 },
    baseUrl: String,
    useRemote: { type: Boolean, default: false },
  },
  data: function () {
    return {
      sortKey: "",
      data: [],
      cols: [],
      rows: [],
      currentPage: 1,
      totalPages: null,
      dataSource: DataSource
    };
  },
  computed: {},
  filters: {
    ...customFilters,
  },
  methods: {
    sortBy(sortObject) {
      this.sortKey = sortObject.key;
      this.dataSource
        .sort(sortObject.key, sortObject.direction)
        .then(() => this.$refs.pager.goToPage(1))
        .catch((err) => console.error(err));
    },
    onRowClick(row) {
      this.$emit("rowClick", row);
    },
    applyFilter(filterData) {
      console.log("apply filter to grid", filterData);
      this.dataSource
        .applyFilter(filterData)
        .then(() => this.$refs.pager.goToPage(1))
        .catch((err) => console.error(err));
    },
    clearFilter(col) {
      console.log("clear filter in grid", col);
      this.dataSource
        .removeFilter(col)
        .then(() => this.$refs.pager.goToPage(1))
        .catch((err) => console.error(err));
    },
    onPageChange(pageNumber) {
      console.log("page change ", pageNumber);
      this.currentPage = pageNumber;
      this.dataSource.setPage(pageNumber);
    },
  },
  watch: {
    "dataSource.currentItemsCount": function (newVal) {
      this.totalPages = Math.ceil(newVal / this.pageSize);
    },
  },
  mounted: function () {
    this.dataSource = DataSource;

    let queryString = location.href.split("?")[1];

    if (queryString) {
      //TODO Parse query string and set data source params
    }

    if (this.useRemote) {
      this.dataSource.baseUrl = this.baseUrl;
    }

    if (this.paging) {
      this.dataSource.paging = true;
      this.dataSource.pageSize = this.pageSize;

      if (!this.useRemote) {
        this.totalPages = Math.ceil(this.items.length / this.pageSize);
      }
    }

    this.columns.forEach((item) => {
      this.cols.push(new Column(item));
    });

    if (this.useRemote) {
      this.dataSource.setData(null);
    } else {
      this.dataSource.setData(this.items);
    }
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>