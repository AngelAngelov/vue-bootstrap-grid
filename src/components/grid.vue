<template>
    <table class="table table-bordered table-hover">
        <thead class="thead-light">
            <tr>
                <th v-if="key.sortable" v-for="(key, index) in cols" :key='index'>
                    <a href="#" @click="sortBy(key.prop)" :class="{ active: sortKey == key.prop }">
                        {{ (typeof key.title == 'function' ? key.title() : key.title) | capitalize }}
                        <font-awesome-icon icon="sort" v-if="sortKey !== key.prop" />
                        <font-awesome-icon icon="sort-up" v-else-if="sortKey == key.prop && sortOrders[sortKey] == 1" />
                        <font-awesome-icon icon="sort-down" v-else-if="sortKey == key.prop && sortOrders[sortKey] == -1" />
                    </a>
                    
                    <filter-icon :col.sync="key" :filters.sync="appliedFilters"></filter-icon>
                </th>
                <th v-else>{{ key.title | capitalize }}</th>
            </tr>
        </thead>
        <tbody>
            <tr class="pointer" v-for="(entry, index) in filteredData" :key='index' @dblclick="onDblClick(entry)">
                <td v-if="rowNumbers">{{index+1}}</td>
                <td v-for="(key, index) in columns" :key='index' v-bind:class="['text-' + key.textAlign]">
                    <span v-if="key.type === 'date'">{{entry[key.prop] | date}}</span>
                    <span v-else-if="key.type === 'html'" v-html="entry[key.prop]"></span>
                    <span v-else>{{entry[key.prop]}}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import moment from "moment";
import Column from "../models/column";
import filter from './filter';

export default {
  name: "grid",
  props: {
    items: Array,
    columns: Array,
    filterKey: String,
    rowNumbers: { type: Boolean, default: false }
  },
  components: {
    'filter-icon': filter
  },
  data: function() {
    var sortOrders = {};
    this.columns.forEach(function(key) {
      sortOrders[key.prop] = 1;
    });
    return {
      sortKey: "",
      sortOrders: sortOrders,
      data: [],
      cols: [],
      rows: [],
      settings: {
        showPaging: true,
        pagingType: 'list',
        itemsPerPage: 10,
        apiUrl: '',
        apiProp: ''
      },
      appliedFilters: []
    };
  },
  computed: {
    filteredData() {
      var sortKey = this.sortKey;
      //var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1;
      var data = this.rows;

      if (sortKey) {
        data = data.slice().sort(function(a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
    },
    isFiltered () {
      var vm = this;
      return function (prop) {
        return vm.appliedFilters.includes(prop);
      };
   }
  },
  filters: {
    capitalize(str) {
      str = typeof str === "function" ? str() : str;
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    date(value) {
      if (value) {
        return moment(String(value)).format("DD.MM.YYYY");
      }
    },
    datetime(value) {
      if (value) {
        return moment(String(value)).format("DD.MM.YYYY HH:mm");
      }
    },
    time(value) {
      if (value) {
        return moment(String(value)).format("HH:mm");
      }
    }
  },
  methods: {
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    onClick(row) {
      this.$emit("rowClick", row);
    },
    onDblClick(row) {
      this.$emit("rowDblClick", row);
    },
    showFilter(prop){
      console.log('show filter: prop - ', prop);
      this.appliedFilters.push(prop);
    }
  },
  mounted: function() {
    this.columns.forEach(item => {
      this.cols.push(new Column(item));
    });

    this.rows = [...this.items];
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