<template>
    <table class="table table-bordered table-hover">
        <thead class="thead-light">
            <tr>
                <th v-if="key.sortable" v-for="(key, index) in cols" @click="sortBy(key.prop)" :key='index' :class="{ active: sortKey == key.prop }">
                    <a href="#!">
                        {{ (typeof key.title == 'function' ? key.title() : key.title) | capitalize }}
                        <font-awesome-icon icon="sort" v-if="sortKey !== key.prop" />
                        <font-awesome-icon icon="sort-up" v-else-if="sortKey == key.prop && sortOrders[sortKey] == 1" />
                        <font-awesome-icon icon="sort-down" v-else-if="sortKey == key.prop && sortOrders[sortKey] == -1" />
                    </a>
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

export default {
  name: "grid",
  props: {
    items: Array,
    columns: Array,
    filterKey: String,
    rowNumbers: { type: Boolean, default: false }
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
      rows: []
    };
  },
  computed: {
    filteredData: function() {
      var sortKey = this.sortKey;
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1;
      var data = this.rows;

      if (filterKey) {
        data = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            );
          });
        });
      }
      if (sortKey) {
        data = data.slice().sort(function(a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
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

.pointer {
  cursor: pointer;
}
</style>