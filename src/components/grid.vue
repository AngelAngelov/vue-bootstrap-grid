<template>
  <div>
    <table class="table table-bordered table-hover">
      <thead class="thead-light">
        <tr>
          <th class="text-left" v-for="(key, index) in cols" :key="index" :class="{ active: sortKey == key.prop }">
            <a href="#!" @click="sortBy(key.prop)" v-if="key.sortable">
              {{ (typeof key.title == 'function' ? key.title() : key.title) | capitalize }}
              <font-awesome-icon icon="sort" v-if="sortKey !== key.prop"/>
              <font-awesome-icon icon="sort-up" v-else-if="sortKey == key.prop && dataSource.sortOrders[sortKey] == 1"/>
              <font-awesome-icon icon="sort-down" v-else-if="sortKey == key.prop && dataSource.sortOrders[sortKey] == -1"/>
            </a>
            <span v-else>{{ key.title | capitalize }}</span>
            <span class="float-right pointer" v-if="key.filterable">
              <grid-filter :col="key" @change="applyFilter" @clear="clearFilter"></grid-filter>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="pointer" v-for="(row, index) in dataSource.data" :key="index" @click="onRowClick(row)">
          <td v-if="rowNumbers">{{index+1}}</td>
          <td v-for="(key, index) in columns" :key="index" v-bind:class="['text-' + key.textAlign]">
            <span v-if="key.type === 'date'">{{row.items[key.prop] | date}}</span>
            <span v-else-if="key.type === 'html'" v-html="row.items[key.prop]"></span>
            <span v-else>{{row.items[key.prop]}}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <pager v-if="paging" :total-pages="totalPages" :initial-page="currentPage" @change="onPageChange" ref="pager"></pager>
  </div>
</template>

<script>
import Column from '../models/column';
import Row from '../models/row';
import customFilters from '../models/filters';
import Filter from './filter.vue';
import Pager from './pager.vue';
import DataSource from '../models/data-source';

import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSort,
  faSortUp,
  faSortDown,
  faFilter
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add([faSort, faSortUp, faSortDown, faFilter]);
Vue.component('font-awesome-icon', FontAwesomeIcon);

export default {
  name: 'grid',
  components: {
    'grid-filter': Filter,
    pager: Pager
  },
  props: {
    items: Array,
    columns: Array,
    filterKey: String,
    rowNumbers: { type: Boolean, default: false },
    paging: { type: Boolean, default: false },
    pageSize: { type: Number, default: 10 },
    baseUrl: String,
    useRemote: { type: Boolean, default: false }
  },
  data: function() {
    return {
      sortKey: '',
      data: [],
      cols: [],
      rows: [],
      currentPage: 1,
      totalPages: null,
      dataSource: DataSource,
      totalPages: 0
    };
  },
  computed: {},
  filters: {
    ...customFilters
  },
  methods: {
    sortBy(key) {
      this.sortKey = key;
      this.dataSource
        .sort(key)
        .then(err => this.$refs.pager.goToPage(1))
        .catch(err => console.error(err));
    },
    onRowClick(row) {
      this.$emit('rowClick', row);
    },
    applyFilter(filterData) {
      console.log('apply filter to grid', filterData);
      this.dataSource
        .applyFilter(filterData)
        .then(err => this.$refs.pager.goToPage(1))
        .catch(err => console.error(err));
    },
    clearFilter(col) {
      console.log('clear filter in grid', col);
      this.dataSource
        .removeFilter(col)
        .then(() => this.$refs.pager.goToPage(1))
        .catch(err => console.error(err));
    },
    onPageChange(pageNumber) {
      console.log('page change ', pageNumber);
      this.dataSource.setPage(pageNumber);
    }
  },
  watch: {
    'dataSource.currentItemsCount': function(newVal, oldVal) {
      this.totalPages = Math.ceil(newVal / this.pageSize);
    }
  },
  mounted: function() {
    this.dataSource = DataSource;

    let queryString = location.href.split('?')[1];

    if (queryString) {
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

    this.columns.forEach(item => {
      this.cols.push(new Column(item));
      this.dataSource.sortOrders[item.prop] = 1;
    });

    if (this.useRemote) {
      this.dataSource.setData(null);
    } else {
      this.dataSource.setData(this.items);
    }
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